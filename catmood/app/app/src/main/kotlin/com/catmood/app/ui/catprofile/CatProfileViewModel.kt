package com.catmood.app.ui.catprofile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.usecase.ManageCatProfileUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

sealed interface CatProfileUiState {
    data object Loading : CatProfileUiState
    data object Empty : CatProfileUiState
    data class Content(val profiles: List<CatProfile>) : CatProfileUiState
}

@HiltViewModel
class CatProfileViewModel @Inject constructor(
    private val manageCatProfile: ManageCatProfileUseCase,
) : ViewModel() {

    val uiState: StateFlow<CatProfileUiState> = manageCatProfile.observeProfiles()
        .map { profiles ->
            if (profiles.isEmpty()) {
                CatProfileUiState.Empty
            } else {
                CatProfileUiState.Content(profiles)
            }
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = CatProfileUiState.Loading,
        )

    fun saveProfile(name: String, breed: String?, existingId: Long = 0L) {
        val trimmed = name.trim()
        if (trimmed.isEmpty()) return
        viewModelScope.launch {
            manageCatProfile.upsert(
                CatProfile(
                    id = existingId,
                    name = trimmed,
                    breed = breed?.trim()?.takeIf { it.isNotEmpty() },
                ),
            )
        }
    }

    fun deleteProfile(id: Long) {
        viewModelScope.launch { manageCatProfile.delete(id) }
    }
}
