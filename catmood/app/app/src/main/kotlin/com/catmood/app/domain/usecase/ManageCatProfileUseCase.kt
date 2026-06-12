package com.catmood.app.domain.usecase

import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.repository.CatProfileRepository
import javax.inject.Inject
import kotlinx.coroutines.flow.Flow

/** Create/read/update/delete cat profiles. Results attach to a profile by id. */
class ManageCatProfileUseCase @Inject constructor(
    private val catProfileRepository: CatProfileRepository,
) {
    fun observeProfiles(): Flow<List<CatProfile>> = catProfileRepository.observeProfiles()

    suspend fun get(id: Long): CatProfile? = catProfileRepository.getProfile(id)

    suspend fun upsert(profile: CatProfile): Long = catProfileRepository.upsert(profile)

    suspend fun delete(id: Long) = catProfileRepository.delete(id)
}
