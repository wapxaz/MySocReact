//вспомогательные функции

//обновление объекта в массиве
export const updatObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return { ...u, ...newObjProps };
        }
        return u;
    })
}