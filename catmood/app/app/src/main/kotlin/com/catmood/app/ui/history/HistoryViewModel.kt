package com.catmood.app.ui.history

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.usecase.GetHistoryUseCase
import com.catmood.app.domain.usecase.ManageCatProfileUseCase
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn

sealed interface HistoryUiState {
    data object Loading : HistoryUiState
    data object Empty : HistoryUiState
    data class Content(
        val records: List<AnalysisRecord>,
        val profiles: List<CatProfile>,
        val selectedCatId: Long?,
    ) : HistoryUiState
}

@OptIn(ExperimentalCoroutinesApi::class)
@HiltViewModel
class HistoryViewModel @Inject constructor(
    getHistory: GetHistoryUseCase,
    manageCatProfile: ManageCatProfileUseCase,
) : ViewModel() {

    /**
     * Per-cat filter stub: selectable, but Phase-0 records are saved without
     * a catId, so a non-null filter usually shows the empty state.
     */
    private val selectedCatId = MutableStateFlow<Long?>(null)

    val uiState: StateFlow<HistoryUiState> = combine(
        selectedCatId.flatMapLatest { catId -> getHistory(catId) },
        manageCatProfile.observeProfiles(),
        selectedCatId,
    ) { records, profiles, catId ->
        if (records.isEmpty() && profiles.isEmpty()) {
            HistoryUiState.Empty
        } else {
            HistoryUiState.Content(
                records = records,
                profiles = profiles,
                selectedCatId = catId,
            )
        }
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = HistoryUiState.Loading,
    )

    fun selectCat(catId: Long?) {
        selectedCatId.value = catId
    }
}
