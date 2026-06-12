package com.catmood.app.domain.analyzer

/**
 * First-class, typed failure modes for analyzers. Carried inside
 * [kotlin.Result] failures so every UI surface can render a specific,
 * actionable error state.
 */
sealed class AnalysisError : Exception() {
    /** No cat face found in the photo — prompt a retake, not a verdict. */
    data object NoCatDetected : AnalysisError() {
        private fun readResolve(): Any = NoCatDetected
    }

    /** Recording too noisy/short to classify — prompt re-record. */
    data object TooNoisy : AnalysisError() {
        private fun readResolve(): Any = TooNoisy
    }

    /** Model asset failed to load (corrupt/missing). */
    data object ModelLoadFailure : AnalysisError() {
        private fun readResolve(): Any = ModelLoadFailure
    }
}
