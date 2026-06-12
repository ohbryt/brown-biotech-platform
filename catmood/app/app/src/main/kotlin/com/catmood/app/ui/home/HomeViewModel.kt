package com.catmood.app.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.usecase.GetHistoryUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn

sealed interface HomeUiState {
    data object Loading : HomeUiState
    data object Empty : HomeUiState
    data class Content(val recentRecords: List<AnalysisRecord>) : HomeUiState
}

@HiltViewModel
class HomeViewModel @Inject constructor(
    getHistory: GetHistoryUseCase,
) : ViewModel() {

    val uiState: StateFlow<HomeUiState> = getHistory()
        .map { records ->
            if (records.isEmpty()) {
                HomeUiState.Empty
            } else {
                HomeUiState.Content(records.take(RECENT_LIMIT))
            }
        }
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = HomeUiState.Loading,
        )

    private companion object {
        const val RECENT_LIMIT = 5
    }
}
