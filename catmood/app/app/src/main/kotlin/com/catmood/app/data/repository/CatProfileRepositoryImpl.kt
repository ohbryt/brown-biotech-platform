package com.catmood.app.data.repository

import com.catmood.app.data.local.CatProfileDao
import com.catmood.app.data.local.Mappers.toDomain
import com.catmood.app.data.local.Mappers.toEntity
import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.repository.CatProfileRepository
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

@Singleton
class CatProfileRepositoryImpl @Inject constructor(
    private val catProfileDao: CatProfileDao,
) : CatProfileRepository {

    override fun observeProfiles(): Flow<List<CatProfile>> =
        catProfileDao.observeAll().map { entities -> entities.map { it.toDomain() } }

    override suspend fun getProfile(id: Long): CatProfile? =
        catProfileDao.getById(id)?.toDomain()

    override suspend fun upsert(profile: CatProfile): Long =
        catProfileDao.upsert(profile.toEntity())

    override suspend fun delete(id: Long) = catProfileDao.deleteById(id)
}
