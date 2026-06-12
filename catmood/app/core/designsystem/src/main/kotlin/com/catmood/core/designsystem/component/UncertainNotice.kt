package com.catmood.core.designsystem.component

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.catmood.core.designsystem.theme.CatMoodSpacing

/**
 * Honest "we couldn't tell" state for low-confidence / uncertain results.
 * Shown instead of a verdict — never alongside a confident headline.
 */
@Composable
fun UncertainNotice(
    title: String,
    body: String,
    modifier: Modifier = Modifier,
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer,
        ),
    ) {
        Row(
            verticalAlignment = Alignment.Top,
            modifier = Modifier.padding(CatMoodSpacing.md),
        ) {
            Icon(
                imageVector = Icons.Outlined.Search,
                contentDescription = null,
                modifier = Modifier.size(24.dp),
            )
            Column(modifier = Modifier.padding(start = CatMoodSpacing.sm)) {
                Text(text = title, style = MaterialTheme.typography.titleMedium)
                Text(
                    text = body,
                    style = MaterialTheme.typography.bodyMedium,
                    modifier = Modifier.padding(top = CatMoodSpacing.xs),
                )
            }
        }
    }
}
