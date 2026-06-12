package com.catmood.app.ui.home

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.heightIn
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DateRange
import androidx.compose.material.icons.filled.Face
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.catmood.app.R
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.AnalysisType
import com.catmood.app.ui.common.labelRes
import com.catmood.core.designsystem.component.ConfidenceBadge
import com.catmood.core.designsystem.theme.CatMoodSpacing
import java.text.DateFormat
import java.util.Date
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(
    onPhotoClick: () -> Unit,
    onAudioClick: () -> Unit,
    onHistoryClick: () -> Unit,
    onProfilesClick: () -> Unit,
    onSettingsClick: () -> Unit,
    viewModel: HomeViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.app_name)) },
                actions = {
                    IconButton(onClick = onHistoryClick) {
                        Icon(
                            Icons.Filled.DateRange,
                            contentDescription = stringResource(R.string.history_title),
                        )
                    }
                    IconButton(onClick = onProfilesClick) {
                        Icon(
                            Icons.Filled.Face,
                            contentDescription = stringResource(R.string.profile_title),
                        )
                    }
                    IconButton(onClick = onSettingsClick) {
                        Icon(
                            Icons.Filled.Settings,
                            contentDescription = stringResource(R.string.settings_title),
                        )
                    }
                },
            )
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(CatMoodSpacing.md),
        ) {
            Text(
                text = stringResource(R.string.home_subtitle),
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )

            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = CatMoodSpacing.md),
                horizontalArrangement = Arrangement.spacedBy(CatMoodSpacing.md),
            ) {
                val photoLabel = stringResource(R.string.home_action_photo)
                Button(
                    onClick = onPhotoClick,
                    modifier = Modifier
                        .weight(1f)
                        .heightIn(min = 96.dp)
                        .semantics { contentDescription = photoLabel },
                ) {
                    Text(photoLabel, style = MaterialTheme.typography.titleMedium)
                }
                val audioLabel = stringResource(R.string.home_action_audio)
                FilledTonalButton(
                    onClick = onAudioClick,
                    modifier = Modifier
                        .weight(1f)
                        .heightIn(min = 96.dp)
                        .semantics { contentDescription = audioLabel },
                ) {
                    Text(audioLabel, style = MaterialTheme.typography.titleMedium)
                }
            }

            Text(
                text = stringResource(R.string.home_recent_title),
                style = MaterialTheme.typography.titleLarge,
                modifier = Modifier.padding(vertical = CatMoodSpacing.sm),
            )

            when (val state = uiState) {
                HomeUiState.Loading -> CircularProgressIndicator(
                    modifier = Modifier
                        .padding(CatMoodSpacing.lg)
                        .align(Alignment.CenterHorizontally),
                )

                HomeUiState.Empty -> Text(
                    text = stringResource(R.string.home_empty),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                    modifier = Modifier.padding(vertical = CatMoodSpacing.md),
                )

                is HomeUiState.Content -> LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.sm),
                ) {
                    items(state.recentRecords, key = { it.id }) { record ->
                        RecentRecordCard(record)
                    }
                }
            }
        }
    }
}

@Composable
private fun RecentRecordCard(record: AnalysisRecord) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(CatMoodSpacing.md)) {
            val typeLabel = when (record.type) {
                AnalysisType.PHOTO -> stringResource(R.string.history_type_photo)
                AnalysisType.AUDIO -> stringResource(R.string.history_type_audio)
            }
            val headline = when (record.type) {
                AnalysisType.PHOTO -> record.photo?.distribution
                    ?.maxByOrNull { it.value }
                    ?.let { stringResource(it.key.labelRes()) }

                AnalysisType.AUDIO -> record.audio?.topContexts
                    ?.firstOrNull()
                    ?.let { stringResource(it.context.labelRes()) }
            }
            Text(
                text = listOfNotNull(typeLabel, headline).joinToString(" · "),
                style = MaterialTheme.typography.titleMedium,
            )
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = CatMoodSpacing.sm),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = DateFormat.getDateTimeInstance(
                        DateFormat.MEDIUM,
                        DateFormat.SHORT,
                    ).format(Date(record.createdAt)),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                ConfidenceBadge(
                    confidence = record.confidence,
                    text = stringResource(
                        R.string.confidence_label,
                        (record.confidence * 100).roundToInt(),
                    ),
                )
            }
        }
    }
}
