export interface IOnRefreshProps {
    refetch:() => Promise<void>
    state:{
        setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
    }
}

export const onRefresh = async (params: IOnRefreshProps) => {

    const { state ,refetch} = params;

    state.setRefreshing(true);
    await refetch();
    state.setRefreshing(false);
};

