package com.catmood.app.domain.usecase

import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.repository.AnalysisHistoryRepository
import javax.inject.Inject

/** Persists a completed analysis to local history (on-device only). */
class SaveResultUseCase @Inject constructor(
    private val historyRepository: AnalysisHistoryRepository,
) {
    suspend operator fun invoke(record: AnalysisRecord): Long =
        historyRepository.save(record)
}
