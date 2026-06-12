package com.catmood.app.data.repository

import com.catmood.app.data.local.AnalysisDao
import com.catmood.app.data.local.Mappers.toDomain
import com.catmood.app.data.local.Mappers.toEntity
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.repository.AnalysisHistoryRepository
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

@Singleton
class AnalysisHistoryRepositoryImpl @Inject constructor(
    private val analysisDao: AnalysisDao,
) : AnalysisHistoryRepository {

    override suspend fun save(record: AnalysisRecord): Long =
        analysisDao.insert(record.toEntity())

    override fun observeHistory(catId: Long?): Flow<List<AnalysisRecord>> {
        val source = if (catId == null) {
            analysisDao.observeAll()
        } else {
            analysisDao.observeForCat(catId)
        }
        return source.map { entities -> entities.map { it.toDomain() } }
    }
}
