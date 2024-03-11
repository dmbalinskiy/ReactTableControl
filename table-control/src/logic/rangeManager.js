import rangeDef from './range'

class rangeManager {
    constructor(isColumnRange){
        this.isColumnRange = isColumnRange;
        this.#rangeArray = [];
    }

    get ranges() {
        return this.#rangeArray;
    }

    createAndAddRange(
        startRange, 
        endRange, 
        maxCount, 
        isFixedRange, 
        isEditableCell,
        cellModifier,
        cellClickHandler
        ){
        let range = new rangeDef(
            startRange, 
            endRange, 
            maxCount, 
            this.isColumnRange, 
            isFixedRange, 
            isEditableCell, 
            cellModifier,
            cellClickHandler);
        this.#rangeArray.push(range);
    }

    getCellModifier(idx){
        const range = this.#getRangeByIdx(idx);
        return range.cellModifier;
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
        //console.log('can add cell data');
        //console.log(cellData);
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


    #rangeArray;
}

export default rangeManager;