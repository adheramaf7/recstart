type FlashMessage = {
    id: string,
    type: 'success' | 'error',
    message: string,
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    flash: FlashMessage | null
};

type setDataByObject<TForm> = (data: TForm) => void;
type setDataByMethod<TForm> = (data: (previousData: TForm) => TForm) => void;
type setDataByKeyValuePair<TForm> = <K extends keyof TForm>(key: K, value: TForm[K]) => void;

export type setFormData<TForm> = setDataByObject<TForm> & setDataByMethod<TForm> & setDataByKeyValuePair<TForm>;
export type errorsFormData<TForm> = Partial<Record<keyof TForm, string>>;

