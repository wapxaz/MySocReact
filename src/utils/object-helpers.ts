//вспомогательные функции

//обновление объекта в массиве
export const updatObjectInArray = (items: any, itemId: any, objPropName: any, newObjProps: any) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps };
        }
        return u;
    })
}