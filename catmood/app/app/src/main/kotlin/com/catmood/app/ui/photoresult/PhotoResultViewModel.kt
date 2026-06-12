package com.catmood.app.ui.photoresult

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.AnalysisType
import com.catmood.app.domain.model.PainLevel
import com.catmood.app.domain.model.PhotoAnalysis
import com.catmood.app.domain.usecase.AnalyzePhotoUseCase
import com.catmood.app.domain.usecase.SaveResultUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface PhotoResultUiState {
    data object Loading : PhotoResultUiState

    data class Content(
        val analysis: PhotoAnalysis,
        val painLevel: PainLevel,
    ) : PhotoResultUiState

    /** Below confidence threshold: "not sure" framing, retake prompt. */
    data class LowConfidence(val analysis: PhotoAnalysis) : PhotoResultUiState

    data class Error(val error: AnalysisError) : PhotoResultUiState
}

@HiltViewModel
class PhotoResultViewModel @Inject constructor(
    private val analyzePhoto: AnalyzePhotoUseCase,
    private val saveResult: SaveResultUseCase,
) : ViewModel() {

    private val _uiState = MutableStateFlow<PhotoResultUiState>(PhotoResultUiState.Loading)
    val uiState: StateFlow<PhotoResultUiState> = _uiState.asStateFlow()

    init {
        analyze()
    }

    /** Phase 0: no camera yet, so a placeholder URI feeds the mock analyzer. */
    fun analyze(imageUri: String = SIMULATED_IMAGE_URI) {
        _uiState.value = PhotoResultUiState.Loading
        viewModelScope.launch {
            analyzePhoto(imageUri)
                .onSuccess { analysis ->
                    persist(analysis)
                    _uiState.value = if (analysis.confidence < LOW_CONFIDENCE_THRESHOLD) {
                        PhotoResultUiState.LowConfidence(analysis)
                    } else {
                        PhotoResultUiState.Content(
                            analysis = analysis,
                            painLevel = PainLevel.fromScore(analysis.painScore),
                        )
                    }
                }
                .onFailure { throwable ->
                    _uiState.value = PhotoResultUiState.Error(
                        throwable as? AnalysisError ?: AnalysisError.ModelLoadFailure,
                    )
                }
        }
    }

    private suspend fun persist(analysis: PhotoAnalysis) {
        saveResult(
            AnalysisRecord(
                catId = null, // Per-cat attachment lands with profile selection (Phase 3).
                type = AnalysisType.PHOTO,
                confidence = analysis.confidence,
                painScore = analysis.painScore,
                createdAt = System.currentTimeMillis(),
                photo = analysis,
            ),
        )
    }

    companion object {
        /** Placeholder until calibrated thresholds arrive in Phase 1. */
        const val LOW_CONFIDENCE_THRESHOLD = 0.55f
        const val SIMULATED_IMAGE_URI = "mock://simulated-photo"
    }
}
