package com.catmood.app.ui.audiorecord

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import com.catmood.app.R
import com.catmood.core.designsystem.theme.CatMoodSpacing

/**
 * Phase 0 stub: no real AudioRecord wiring yet. Record/Stop only toggles a
 * placeholder waveform; "Simulate recording" drives the end-to-end flow.
 * Real capture (level meter + countdown) lands in Phase 2.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AudioRecordScreen(
    onBack: () -> Unit,
    onRecordingFinished: () -> Unit,
) {
    var isRecording by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.audio_record_title)) },
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
                .padding(CatMoodSpacing.md),
            verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md, Alignment.CenterVertically),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Text(
                text = stringResource(R.string.audio_record_hint),
                style = MaterialTheme.typography.bodyLarge,
            )

            PlaceholderWaveform(
                active = isRecording,
                contentDescriptionText = stringResource(R.string.cd_waveform_placeholder),
            )

            Text(
                text = stringResource(R.string.audio_record_stub_note),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )

            OutlinedButton(
                onClick = { isRecording = !isRecording },
                modifier = Modifier.defaultMinSize(minHeight = CatMoodSpacing.minTouchTarget),
            ) {
                Text(
                    stringResource(
                        if (isRecording) R.string.action_stop else R.string.action_record,
                    ),
                )
            }

            Button(
                onClick = onRecordingFinished,
                modifier = Modifier
                    .fillMaxWidth()
                    .defaultMinSize(minHeight = CatMoodSpacing.minTouchTarget),
            ) {
                Text(stringResource(R.string.action_simulate_recording))
            }
        }
    }
}

@Composable
private fun PlaceholderWaveform(
    active: Boolean,
    contentDescriptionText: String,
) {
    // Static bar heights — purely decorative until real audio levels exist.
    val heights = listOf(12, 28, 44, 20, 36, 52, 30, 16, 40, 24, 48, 18)
    val barColor = if (active) {
        MaterialTheme.colorScheme.primary
    } else {
        MaterialTheme.colorScheme.surfaceVariant
    }
    Row(
        modifier = Modifier
            .height(64.dp)
            .semantics { contentDescription = contentDescriptionText },
        horizontalArrangement = Arrangement.spacedBy(CatMoodSpacing.xs),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        heights.forEach { barHeight ->
            Column(
                modifier = Modifier
                    .width(6.dp)
                    .height(barHeight.dp)
                    .clip(RoundedCornerShape(3.dp))
                    .background(barColor),
            ) {}
        }
    }
}
