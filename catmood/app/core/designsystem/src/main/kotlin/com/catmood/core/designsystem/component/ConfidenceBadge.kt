package com.catmood.core.designsystem.component

import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.catmood.core.designsystem.theme.CatMoodColors
import com.catmood.core.designsystem.theme.CatMoodSpacing

/**
 * Pill badge displaying a confidence value. Caller supplies the localized,
 * hedged text (e.g. "Confidence 72%"); the badge only adds a tone hint.
 * Numeric text is always present, so the tone is never the only signal.
 */
@Composable
fun ConfidenceBadge(
    confidence: Float,
    text: String,
    modifier: Modifier = Modifier,
) {
    val container = when {
        confidence >= 0.7f -> CatMoodColors.OkabeGreen.copy(alpha = 0.18f)
        confidence >= 0.5f -> CatMoodColors.OkabeOrange.copy(alpha = 0.20f)
        else -> CatMoodColors.OkabeVermillion.copy(alpha = 0.18f)
    }
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(50),
        color = container,
        contentColor = MaterialTheme.colorScheme.onSurface,
    ) {
        Text(
            text = text,
            style = MaterialTheme.typography.labelLarge,
            modifier = Modifier.padding(
                horizontal = CatMoodSpacing.md,
                vertical = CatMoodSpacing.sm,
            ),
        )
    }
}
