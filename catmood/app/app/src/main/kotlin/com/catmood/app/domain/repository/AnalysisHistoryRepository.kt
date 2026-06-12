package com.catmood.app.domain.repository

import com.catmood.app.domain.model.AnalysisRecord
import kotlinx.coroutines.flow.Flow

interface AnalysisHistoryRepository {
    suspend fun save(record: AnalysisRecord): Long
    fun observeHistory(catId: Long? = null): Flow<List<AnalysisRecord>>
}
