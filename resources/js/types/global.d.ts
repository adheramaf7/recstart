import { AxiosInstance } from 'axios';
import { route as ziggyRoute } from 'ziggy-js';
import '@tanstack/react-table' //or vue, svelte, solid, qwik, etc.
import { RowData } from '@tanstack/react-table';

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute;
}


declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        className?: string,
    }
}
