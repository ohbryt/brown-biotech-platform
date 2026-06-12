package com.catmood.app.ui.common

import androidx.annotation.StringRes
import androidx.compose.ui.graphics.Color
import com.catmood.app.R
import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.model.EmotionState
import com.catmood.app.domain.model.MeowContext
import com.catmood.app.domain.model.PainLevel
import com.catmood.core.designsystem.component.PainIndicatorLevel
import com.catmood.core.designsystem.theme.CatMoodColors

@StringRes
fun EmotionState.labelRes(): Int = when (this) {
    EmotionState.RELAXED_CONTENT -> R.string.emotion_relaxed_content
    EmotionState.ALERT_AROUSED -> R.string.emotion_alert_aroused
    EmotionState.FEARFUL_ANXIOUS -> R.string.emotion_fearful_anxious
    EmotionState.IRRITATED_AGGRESSIVE -> R.string.emotion_irritated_aggressive
    EmotionState.PAIN_DISCOMFORT -> R.string.emotion_pain_discomfort
}

/** Okabe-Ito colorblind-safe chart colors; labels always accompany them. */
fun EmotionState.chartColor(): Color = when (this) {
    EmotionState.RELAXED_CONTENT -> CatMoodColors.OkabeGreen
    EmotionState.ALERT_AROUSED -> CatMoodColors.OkabeSkyBlue
    EmotionState.FEARFUL_ANXIOUS -> CatMoodColors.OkabePurple
    EmotionState.IRRITATED_AGGRESSIVE -> CatMoodColors.OkabeOrange
    EmotionState.PAIN_DISCOMFORT -> CatMoodColors.OkabeVermillion
}

@StringRes
fun MeowContext.labelRes(): Int = when (this) {
    MeowContext.FOOD_REQUEST -> R.string.context_food_request
    MeowContext.ATTENTION_ISOLATION -> R.string.context_attention_isolation
    MeowContext.HANDLING_CONTACT -> R.string.context_handling_contact
    MeowContext.UNCERTAIN -> R.string.context_uncertain
}

@StringRes
fun PainLevel.labelRes(): Int = when (this) {
    PainLevel.LOW -> R.string.pain_level_low
    PainLevel.MODERATE -> R.string.pain_level_moderate
    PainLevel.HIGH -> R.string.pain_level_high
}

fun PainLevel.toIndicatorLevel(): PainIndicatorLevel = when (this) {
    PainLevel.LOW -> PainIndicatorLevel.LOW
    PainLevel.MODERATE -> PainIndicatorLevel.MODERATE
    PainLevel.HIGH -> PainIndicatorLevel.HIGH
}

@StringRes
fun AnalysisError.messageRes(): Int = when (this) {
    AnalysisError.NoCatDetected -> R.string.error_no_cat
    AnalysisError.TooNoisy -> R.string.error_too_noisy
    AnalysisError.ModelLoadFailure -> R.string.error_model_load
}
