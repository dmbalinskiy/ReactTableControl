import rangeDef from './range'

class rangeManager {
    constructor(isColumnRange){
        this.isColumnRange = isColumnRange;
        this.#rangeArray = [];
    }

    createAndAddRange(cellData, maxCount, isFixedRange, isEditableCell, cellClickHandler){
        let range = new rangeDef(maxCount, this.isColumnRange, isFixedRange, isEditableCell, cellClickHandler);
        range.addCell(cellData);
        this.#rangeArray.push(range);
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
            this.#updateRangeIndexesOnOtherRanges(cellData, true);
        }
    }

    deleteCell(cellData){
        const range = this.#getRangeByCellData(cellData);
        if(range.canDeleteCell(cellData)){
            range.deleteCell(cellData);
            this.#updateRangeIndexesOnOtherRanges(cellData, false);
        }
    }

    #getRangeByCellData(cellData){
        let resultRng;
        const idxToCompare = this.isColumnRange ? cellData.idx : cellData.rowIdx;
        for(let rng of this.#rangeArray){
            if(rng.rangeStartIdx <= idxToCompare && rng.rangeEndIdx >= idxToCompare ){
                resultRng = rng;
                break;
            }
        }
        return resultRng;
    }

    #updateRangeIndexesOnOtherRanges(cellData, isAddition){
        let rng = this.#getRangeByCellData(cellData);
        const idx = this.#rangeArray.findIndex(r => r === rng);
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