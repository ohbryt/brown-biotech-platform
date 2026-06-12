package com.catmood.core.designsystem.component

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import com.catmood.core.designsystem.theme.CatMoodSpacing
import kotlin.math.roundToInt

data class DistributionEntry(
    val label: String,
    val probability: Float,
    val color: Color? = null,
)

/**
 * Horizontal bar chart for a label -> probability distribution.
 * Each row shows label, bar and numeric percentage, so the value never
 * depends on color perception alone.
 */
@Composable
fun DistributionBarChart(
    entries: List<DistributionEntry>,
    modifier: Modifier = Modifier,
    chartContentDescription: String? = null,
) {
    val summary = chartContentDescription
        ?: entries.joinToString { "${it.label} ${(it.probability * 100).roundToInt()}%" }
    Column(
        modifier = modifier
            .fillMaxWidth()
            .semantics { contentDescription = summary },
    ) {
        entries.forEach { entry ->
            val percent = (entry.probability * 100).roundToInt()
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(vertical = CatMoodSpacing.xs),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(
                    text = entry.label,
                    style = MaterialTheme.typography.bodyMedium,
                    maxLines = 1,
                    overflow = TextOverflow.Ellipsis,
                    modifier = Modifier.width(132.dp),
                )
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(14.dp)
                        .clip(RoundedCornerShape(7.dp))
                        .background(MaterialTheme.colorScheme.surfaceVariant),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(entry.probability.coerceIn(0f, 1f))
                            .fillMaxHeight()
                            .clip(RoundedCornerShape(7.dp))
                            .background(entry.color ?: MaterialTheme.colorScheme.primary),
                    )
                }
                Text(
                    text = "$percent%",
                    style = MaterialTheme.typography.labelLarge,
                    modifier = Modifier
                        .padding(start = CatMoodSpacing.sm)
                        .width(44.dp),
                )
            }
        }
    }
}
