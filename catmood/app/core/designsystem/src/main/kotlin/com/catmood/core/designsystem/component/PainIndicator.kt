package com.catmood.core.designsystem.component

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.catmood.core.designsystem.theme.CatMoodColors
import com.catmood.core.designsystem.theme.CatMoodSpacing

/** Visual level for the pain/discomfort indicator. */
enum class PainIndicatorLevel { LOW, MODERATE, HIGH }

/**
 * Pain/discomfort indicator. Accessibility rule: level is conveyed by
 * color AND icon AND text together — never color alone.
 */
@Composable
fun PainIndicator(
    level: PainIndicatorLevel,
    label: String,
    modifier: Modifier = Modifier,
) {
    val (color, icon) = when (level) {
        PainIndicatorLevel.LOW -> CatMoodColors.PainLow to Icons.Filled.CheckCircle
        PainIndicatorLevel.MODERATE -> CatMoodColors.PainModerate to Icons.Filled.Info
        PainIndicatorLevel.HIGH -> CatMoodColors.PainHigh to Icons.Filled.Warning
    }
    Surface(
        modifier = modifier,
        shape = RoundedCornerShape(12.dp),
        color = color.copy(alpha = 0.15f),
        contentColor = MaterialTheme.colorScheme.onSurface,
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.padding(CatMoodSpacing.md),
        ) {
            Icon(
                imageVector = icon,
                // Text label below carries the meaning for TalkBack.
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(24.dp),
            )
            Text(
                text = label,
                style = MaterialTheme.typography.titleMedium,
                modifier = Modifier.padding(start = CatMoodSpacing.sm),
            )
        }
    }
}
