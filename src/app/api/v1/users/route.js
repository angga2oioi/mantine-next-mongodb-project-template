//@ts-check

import { SUCCESS_ERR_CODE, SUCCESS_ERR_MESSAGE } from "@/global/utils/constant";
import { parseError } from "@/global/utils/functions";
import { paginateUserAccount } from "@/server/service/user.account";
import { NextResponse } from "next/server";
export async function GET(request,) {
    try {

        const { searchParams } = new URL(request.nextUrl);
        const {
            search,
            page,
            limit,
            sortBy
        } = Object.fromEntries(searchParams.entries());

        let list = await paginateUserAccount({ search }, sortBy, limit, page)

        return NextResponse.json({
            error: SUCCESS_ERR_CODE,
            message: SUCCESS_ERR_MESSAGE,
            data: list
        });

    } catch (e) {
        return NextResponse.json(parseError(e), { status: e?.error || 400 });
    }
}