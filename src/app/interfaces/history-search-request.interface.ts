export interface IHistorySearchRequest {
    /** Account key */
    key: string;

    /** Start date of the search */
    dateFrom: Date;

    /** End date of the search */
    dateTo: Date;
}
