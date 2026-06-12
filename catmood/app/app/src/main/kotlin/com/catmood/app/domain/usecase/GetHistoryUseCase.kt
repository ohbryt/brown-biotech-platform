package com.catmood.app.domain.usecase

import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.repository.AnalysisHistoryRepository
import javax.inject.Inject
import kotlinx.coroutines.flow.Flow

/** Streams saved observations, newest first, optionally filtered by cat. */
class GetHistoryUseCase @Inject constructor(
    private val historyRepository: AnalysisHistoryRepository,
) {
    operator fun invoke(catId: Long? = null): Flow<List<AnalysisRecord>> =
        historyRepository.observeHistory(catId)
}
