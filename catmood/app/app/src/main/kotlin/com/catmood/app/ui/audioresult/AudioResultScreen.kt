package com.catmood.app.ui.audioresult

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
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
import com.catmood.app.domain.model.AudioAnalysis
import com.catmood.app.ui.common.labelRes
import com.catmood.app.ui.common.messageRes
import com.catmood.core.designsystem.component.ConfidenceBadge
import com.catmood.core.designsystem.component.DisclaimerCard
import com.catmood.core.designsystem.component.DistributionBarChart
import com.catmood.core.designsystem.component.DistributionEntry
import com.catmood.core.designsystem.component.UncertainNotice
import com.catmood.core.designsystem.theme.CatMoodSpacing
import kotlin.math.roundToInt

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AudioResultScreen(
    onBack: () -> Unit,
    viewModel: AudioResultViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.audio_result_title)) },
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
                AudioResultUiState.Loading -> CircularProgressIndicator(
                    modifier = Modifier.align(Alignment.Center),
                )

                is AudioResultUiState.Content -> AudioResultContent(state.analysis)

                is AudioResultUiState.Uncertain -> UncertainContent(
                    analysis = state.analysis,
                    onRetry = { viewModel.analyze() },
                )

                is AudioResultUiState.Error -> ErrorContent(
                    message = stringResource(state.error.messageRes()),
                    onRetry = { viewModel.analyze() },
                )
            }
        }
    }
}

@Composable
private fun AudioResultContent(analysis: AudioAnalysis) {
    val top = analysis.topContexts.firstOrNull()
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(CatMoodSpacing.md),
        verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md),
    ) {
        if (top != null) {
            Text(
                text = stringResource(
                    R.string.audio_result_headline,
                    stringResource(top.context.labelRes()),
                    (top.probability * 100).roundToInt(),
                ),
                style = MaterialTheme.typography.headlineMedium,
            )
        }

        ConfidenceBadge(
            confidence = analysis.confidence,
            text = stringResource(
                R.string.confidence_label,
                (analysis.confidence * 100).roundToInt(),
            ),
        )

        DistributionBarChart(
            entries = analysis.topContexts.map { score ->
                DistributionEntry(
                    label = stringResource(score.context.labelRes()),
                    probability = score.probability,
                )
            },
        )

        DisclaimerCard(text = stringResource(R.string.disclaimer_not_medical))
    }
}

@Composable
private fun UncertainContent(
    analysis: AudioAnalysis,
    onRetry: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(CatMoodSpacing.md),
        verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md),
    ) {
        UncertainNotice(
            title = stringResource(R.string.audio_uncertain_title),
            body = stringResource(R.string.audio_uncertain_body),
        )
        ConfidenceBadge(
            confidence = analysis.confidence,
            text = stringResource(
                R.string.confidence_label,
                (analysis.confidence * 100).roundToInt(),
            ),
        )
        Button(
            onClick = onRetry,
            modifier = Modifier.defaultMinSize(minHeight = CatMoodSpacing.minTouchTarget),
        ) {
            Text(stringResource(R.string.action_retry))
        }
        DisclaimerCard(text = stringResource(R.string.disclaimer_not_medical))
    }
}

@Composable
private fun ErrorContent(
    message: String,
    onRetry: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(CatMoodSpacing.md),
        verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md, Alignment.CenterVertically),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(text = message, style = MaterialTheme.typography.titleMedium)
        Button(
            onClick = onRetry,
            modifier = Modifier.defaultMinSize(minHeight = CatMoodSpacing.minTouchTarget),
        ) {
            Text(stringResource(R.string.action_retry))
        }
    }
}
