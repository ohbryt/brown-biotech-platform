package com.catmood.core.designsystem.theme

import androidx.compose.ui.graphics.Color

/**
 * Warm pastel palette with a clinical, data-forward accent set.
 * Chart/state colors are drawn from the Okabe-Ito colorblind-safe palette.
 * State must never be conveyed by color alone (see PainIndicator).
 */
object CatMoodColors {
    // Warm neutrals (surfaces).
    val Cream = Color(0xFFFFF8F1)
    val Sand = Color(0xFFF3E9DD)
    val WarmGray = Color(0xFF6F6760)
    val Ink = Color(0xFF2B2622)

    // Primary / secondary.
    val Apricot = Color(0xFFE8A87C)
    val ApricotDeep = Color(0xFFB06A3B)
    val SageMist = Color(0xFFBCCFC0)
    val SageDeep = Color(0xFF4E6B58)

    // Okabe-Ito colorblind-safe accents (charts, badges).
    val OkabeOrange = Color(0xFFE69F00)
    val OkabeSkyBlue = Color(0xFF56B4E9)
    val OkabeGreen = Color(0xFF009E73)
    val OkabeYellow = Color(0xFFF0E442)
    val OkabeBlue = Color(0xFF0072B2)
    val OkabeVermillion = Color(0xFFD55E00)
    val OkabePurple = Color(0xFFCC79A7)

    // Pain indicator levels — always paired with icon + text.
    val PainLow = OkabeGreen
    val PainModerate = OkabeOrange
    val PainHigh = OkabeVermillion

    val DarkSurface = Color(0xFF221E1A)
    val DarkSurfaceVariant = Color(0xFF332D27)
    val DarkOnSurface = Color(0xFFEDE4DB)
}
