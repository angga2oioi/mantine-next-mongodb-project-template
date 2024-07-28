import { minMaxNum } from "@/global/utils/functions"
import { UserAccounts } from "../models"
import striptags from "striptags"

const buildUserAccountSearchQuery = (params) => {

    let query = {}
    if (params?.search) {
        query.$or = [
            {
                name: {
                    $regex: striptags(params?.search),
                    $options: "i"
                }
            },
            {
                email: {
                    $regex: striptags(params?.search),
                    $options: "i"
                }
            }
        ]
    }

    return query

}

export const paginateUserAccount = async (query, sortBy = "createdAt:desc", limit = 1, page = 1) => {

    let queryParams = buildUserAccountSearchQuery(query)
    limit = minMaxNum(limit, 0)
    page = minMaxNum(page, 1)

    let list = await UserAccounts.paginate(queryParams, { sortBy, limit, page })

    list.results = list?.results?.map((n) => {
        return n?.toJSON()
    })

    return list
}