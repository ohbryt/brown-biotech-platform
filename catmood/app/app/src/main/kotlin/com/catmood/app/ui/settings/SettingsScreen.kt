package com.catmood.app.ui.settings

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.catmood.app.R
import com.catmood.core.designsystem.component.DisclaimerCard
import com.catmood.core.designsystem.theme.CatMoodSpacing

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SettingsScreen(
    onBack: () -> Unit,
    viewModel: SettingsViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.settings_title)) },
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
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(CatMoodSpacing.md),
            verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md),
        ) {
            SettingsSectionTitle(stringResource(R.string.settings_language))
            Text(
                text = stringResource(R.string.settings_language_note),
                style = MaterialTheme.typography.bodyMedium,
            )

            HorizontalDivider()

            SettingsSectionTitle(stringResource(R.string.settings_privacy))
            val sharingTitle = stringResource(R.string.settings_sharing_title)
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = sharingTitle,
                    style = MaterialTheme.typography.bodyLarge,
                    modifier = Modifier.weight(1f),
                )
                Switch(
                    checked = uiState.sharingOptIn,
                    onCheckedChange = viewModel::setSharingOptIn,
                    modifier = Modifier.semantics { contentDescription = sharingTitle },
                )
            }
            Text(
                text = stringResource(R.string.settings_sharing_note),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )

            HorizontalDivider()

            SettingsSectionTitle(stringResource(R.string.settings_model_version))
            Text(
                text = uiState.modelVersion,
                style = MaterialTheme.typography.bodyMedium,
            )

            HorizontalDivider()

            SettingsSectionTitle(stringResource(R.string.settings_disclaimers))
            DisclaimerCard(text = stringResource(R.string.disclaimer_not_medical))
            DisclaimerCard(text = stringResource(R.string.vet_note))
        }
    }
}

@Composable
private fun SettingsSectionTitle(text: String) {
    Text(text = text, style = MaterialTheme.typography.titleLarge)
}
