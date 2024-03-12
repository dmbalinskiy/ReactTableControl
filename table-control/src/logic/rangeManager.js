import rangeDef from './range'
import { addIfNotContains, removeIfContains } from './rangeManagersFactory';

class rangeManager {
    constructor(isColumnRange, ranges = []){
        this.#isColumnRange = isColumnRange;
        this.#rangeArray = ranges;
    }

    #isColumnRange;
    get isColumnRange() {
        return this.#isColumnRange;
    }

    #rangeArray;
    get ranges() {
        return this.#rangeArray;
    }

    createAndAddRange(
        count,
        maxCount,
        isFixedRange,
        isEditableCell,
        cellModifier,
        cellClickHandler
        ){
        let range = new rangeDef(
            this.#getLastRangePosition() + 1,
            this.#getLastRangePosition() + count,
            maxCount,
            this.isColumnRange,
            isFixedRange,
            isEditableCell,
            cellModifier,
            cellClickHandler);
        this.#rangeArray.push(range);
    }

    applyBorderModifier(cellData){
        
        const range = this.#getRangeByCellData(cellData);

        if(this.isColumnRange){
            cellData.classes = removeIfContains("range-left", cellData.classes);
            cellData.classes = removeIfContains("range-right", cellData.classes);
        }
        else if(!this.isColumnRange){
            cellData.classes = removeIfContains("range-top", cellData.classes);
            cellData.classes = removeIfContains("range-bottom", cellData.classes);
        }
        
        if(cellData.isVirtual){
            cellData.classes = removeIfContains("range-left", cellData.classes);
            cellData.classes = removeIfContains("range-right", cellData.classes);
            cellData.classes = removeIfContains("range-top", cellData.classes);
            cellData.classes = removeIfContains("range-bottom", cellData.classes);
            return cellData;
        }

        if(range.isCellStartRangeStart(cellData)){
           cellData.classes = addIfNotContains(this.isColumnRange ? "range-left" : "range-top", cellData.classes);
        }
        if(range.isCellEndRangeEnd(cellData)){
            cellData.classes = addIfNotContains(this.isColumnRange ? "range-right" : "range-bottom", cellData.classes);
        }

        return cellData;
    }

    getCellModifier(idx){
        const range = this.#getRangeByIdx(idx);
        return (cellData) => {
            cellData.editable = range.isEditableCell;
            cellData = range.cellModifier(cellData);
            cellData = this.applyBorderModifier(cellData);
            return cellData;
        }
    }

    isCellStartRangeStart(cellData){
        const range = this.#getRangeByCellData(cellData);
        return range.isCellStartRangeStart(cellData);
    }

    isCellEndRangeEnd(cellData){
        const range = this.#getRangeByCellData(cellData);
        return range.isCellEndRangeEnd(cellData);
    }

    canAddCell(cellData){
        const range = this.#getRangeByCellData(cellData);
        return range.canAddCell(cellData);
    }

    canDeleteCell(cellData){
        const range = this.#getRangeByCellData(cellData);
        return range.canDeleteCell(cellData);
    }

    addCell(cellData){
        const range = this.#getRangeByCellData(cellData);
        if(range.canAddCell(cellData)){
            range.addCell(cellData);
            this.#updateRangeIndexesOnOtherRanges(range, true);
        }
    }

    deleteCell(cellData){
        const range = this.#getRangeByCellData(cellData);
        if(range.canDeleteCell(cellData)){
            range.deleteCell(cellData);
            this.#updateRangeIndexesOnOtherRanges(range, false);
        }
    }

    handleClick(cellData){
        const range = this.#getRangeByCellData(cellData);
        range.handleClick(cellData);
    }

    #getRangeByIdx(idx){
        let resultRng;
        for(let rng of this.#rangeArray){
            if(rng.rangeStartIdx <= idx && rng.rangeEndIdx >= idx ){
                resultRng = rng;
                break;
            }
        }
        return resultRng;
    }

    #getRangeByCellData(cellData){
        return this.#getRangeByIdx(this.isColumnRange ? cellData.idx : cellData.rowIdx);
    }

    #updateRangeIndexesOnOtherRanges(range, isAddition){
        const idx = this.#rangeArray.findIndex(r => r === range);
        for(let i = idx + 1; i < this.#rangeArray.length; i++){
            let currRange = this.#rangeArray[i];
            if(isAddition){
                currRange.updateIndexesOnOtherRangeAddition();
            }
            else {
                currRange.updateIndexesOnOtherRangeDeletion();
            }
        }
    }

    #getLastRangePosition(){
        return this.#rangeArray.length > 0
            ? this.#rangeArray[this.#rangeArray.length - 1].rangeEndIdx
            : -1;
    }

}

export default rangeManager;