package com.catmood.app.ui.settings

import androidx.lifecycle.ViewModel
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class SettingsUiState(
    /**
     * Off-device sharing opt-in. DEFAULT OFF and non-functional in Phase 0:
     * the app has no INTERNET permission, so nothing can leave the device
     * regardless of this flag. Persisted + wired only after the Phase-5
     * human decision on sharing.
     */
    val sharingOptIn: Boolean = false,
    val modelVersion: String = MODEL_VERSION,
) {
    companion object {
        const val MODEL_VERSION = "mock-phase0"
    }
}

@HiltViewModel
class SettingsViewModel @Inject constructor() : ViewModel() {

    private val _uiState = MutableStateFlow(SettingsUiState())
    val uiState: StateFlow<SettingsUiState> = _uiState.asStateFlow()

    fun setSharingOptIn(enabled: Boolean) {
        // Not persisted in Phase 0 — toggle exists only so the privacy UX is visible.
        _uiState.value = _uiState.value.copy(sharingOptIn = enabled)
    }
}
