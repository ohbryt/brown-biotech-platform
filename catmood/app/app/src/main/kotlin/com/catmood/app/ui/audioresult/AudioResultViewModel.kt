package com.catmood.app.ui.audioresult

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.AnalysisType
import com.catmood.app.domain.model.AudioAnalysis
import com.catmood.app.domain.usecase.AnalyzeAudioUseCase
import com.catmood.app.domain.usecase.SaveResultUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

sealed interface AudioResultUiState {
    data object Loading : AudioResultUiState

    data class Content(val analysis: AudioAnalysis) : AudioResultUiState

    /** Reject option: model could not tell — shown honestly, no forced verdict. */
    data class Uncertain(val analysis: AudioAnalysis) : AudioResultUiState

    data class Error(val error: AnalysisError) : AudioResultUiState
}

@HiltViewModel
class AudioResultViewModel @Inject constructor(
    private val analyzeAudio: AnalyzeAudioUseCase,
    private val saveResult: SaveResultUseCase,
) : ViewModel() {

    private val _uiState = MutableStateFlow<AudioResultUiState>(AudioResultUiState.Loading)
    val uiState: StateFlow<AudioResultUiState> = _uiState.asStateFlow()

    init {
        analyze()
    }

    /** Phase 0: simulated recording path feeds the mock analyzer. */
    fun analyze(pcmPath: String = SIMULATED_PCM_PATH) {
        _uiState.value = AudioResultUiState.Loading
        viewModelScope.launch {
            analyzeAudio(pcmPath)
                .onSuccess { analysis ->
                    persist(analysis)
                    _uiState.value =
                        if (analysis.isUncertain || analysis.confidence < LOW_CONFIDENCE_THRESHOLD) {
                            AudioResultUiState.Uncertain(analysis)
                        } else {
                            AudioResultUiState.Content(analysis)
                        }
                }
                .onFailure { throwable ->
                    _uiState.value = AudioResultUiState.Error(
                        throwable as? AnalysisError ?: AnalysisError.ModelLoadFailure,
                    )
                }
        }
    }

    private suspend fun persist(analysis: AudioAnalysis) {
        saveResult(
            AnalysisRecord(
                catId = null, // Per-cat attachment lands with profile selection (Phase 3).
                type = AnalysisType.AUDIO,
                confidence = analysis.confidence,
                painScore = null,
                createdAt = System.currentTimeMillis(),
                audio = analysis,
            ),
        )
    }

    companion object {
        /** Placeholder until calibrated thresholds arrive in Phase 2. */
        const val LOW_CONFIDENCE_THRESHOLD = 0.50f
        const val SIMULATED_PCM_PATH = "mock://simulated-recording.pcm"
    }
}
