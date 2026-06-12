package com.catmood.core.designsystem.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = CatMoodColors.ApricotDeep,
    onPrimary = Color.White,
    primaryContainer = CatMoodColors.Apricot,
    onPrimaryContainer = CatMoodColors.Ink,
    secondary = CatMoodColors.SageDeep,
    onSecondary = Color.White,
    secondaryContainer = CatMoodColors.SageMist,
    onSecondaryContainer = CatMoodColors.Ink,
    tertiary = CatMoodColors.OkabeBlue,
    onTertiary = Color.White,
    background = CatMoodColors.Cream,
    onBackground = CatMoodColors.Ink,
    surface = CatMoodColors.Cream,
    onSurface = CatMoodColors.Ink,
    surfaceVariant = CatMoodColors.Sand,
    onSurfaceVariant = CatMoodColors.WarmGray,
    error = CatMoodColors.OkabeVermillion,
    onError = Color.White,
)

private val DarkColorScheme = darkColorScheme(
    primary = CatMoodColors.Apricot,
    onPrimary = CatMoodColors.Ink,
    primaryContainer = CatMoodColors.ApricotDeep,
    onPrimaryContainer = CatMoodColors.DarkOnSurface,
    secondary = CatMoodColors.SageMist,
    onSecondary = CatMoodColors.Ink,
    secondaryContainer = CatMoodColors.SageDeep,
    onSecondaryContainer = CatMoodColors.DarkOnSurface,
    tertiary = CatMoodColors.OkabeSkyBlue,
    onTertiary = CatMoodColors.Ink,
    background = CatMoodColors.DarkSurface,
    onBackground = CatMoodColors.DarkOnSurface,
    surface = CatMoodColors.DarkSurface,
    onSurface = CatMoodColors.DarkOnSurface,
    surfaceVariant = CatMoodColors.DarkSurfaceVariant,
    onSurfaceVariant = CatMoodColors.DarkOnSurface,
    error = CatMoodColors.OkabeVermillion,
    onError = Color.White,
)

@Composable
fun CatMoodTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit,
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme,
        typography = CatMoodTypography,
        content = content,
    )
}
