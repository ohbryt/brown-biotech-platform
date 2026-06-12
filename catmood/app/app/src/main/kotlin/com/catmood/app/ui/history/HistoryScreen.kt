package com.catmood.app.ui.history

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.horizontalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FilterChip
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
fun HistoryScreen(
    onBack: () -> Unit,
    viewModel: HistoryViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.history_title)) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = stringResource(R.string.action_back),
                        )
                    }
                },
            )
        },
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding),
        ) {
            when (val state = uiState) {
                HistoryUiState.Loading -> CircularProgressIndicator(
                    modifier = Modifier.align(Alignment.Center),
                )

                HistoryUiState.Empty -> Text(
                    text = stringResource(R.string.history_empty),
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier
                        .align(Alignment.Center)
                        .padding(CatMoodSpacing.lg),
                )

                is HistoryUiState.Content -> HistoryContent(
                    state = state,
                    onSelectCat = viewModel::selectCat,
                )
            }
        }
    }
}

@Composable
private fun HistoryContent(
    state: HistoryUiState.Content,
    onSelectCat: (Long?) -> Unit,
) {
    Column(modifier = Modifier.fillMaxSize()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = CatMoodSpacing.md),
            horizontalArrangement = Arrangement.spacedBy(CatMoodSpacing.sm),
        ) {
            FilterChip(
                selected = state.selectedCatId == null,
                onClick = { onSelectCat(null) },
                label = { Text(stringResource(R.string.history_filter_all)) },
            )
            state.profiles.forEach { profile ->
                FilterChip(
                    selected = state.selectedCatId == profile.id,
                    onClick = { onSelectCat(profile.id) },
                    label = { Text(profile.name) },
                )
            }
        }

        if (state.records.isEmpty()) {
            Text(
                text = stringResource(R.string.history_empty),
                style = MaterialTheme.typography.bodyLarge,
                modifier = Modifier.padding(CatMoodSpacing.lg),
            )
        } else {
            LazyColumn(
                contentPadding = androidx.compose.foundation.layout.PaddingValues(CatMoodSpacing.md),
                verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.sm),
            ) {
                items(state.records, key = { it.id }) { record ->
                    HistoryRecordCard(record)
                }
            }
        }
    }
}

@Composable
private fun HistoryRecordCard(record: AnalysisRecord) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(CatMoodSpacing.md)) {
            val typeLabel = when (record.type) {
                AnalysisType.PHOTO -> stringResource(R.string.history_type_photo)
                AnalysisType.AUDIO -> stringResource(R.string.history_type_audio)
            }
            val topLabel = when (record.type) {
                AnalysisType.PHOTO -> record.photo?.distribution
                    ?.maxByOrNull { it.value }
                    ?.let { stringResource(it.key.labelRes()) }

                AnalysisType.AUDIO -> record.audio?.topContexts
                    ?.firstOrNull()
                    ?.let { stringResource(it.context.labelRes()) }
            }
            Text(
                text = listOfNotNull(typeLabel, topLabel).joinToString(" · "),
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
