
export class range {
    constructor (
        startRange, 
        endRange, 
        maxCount, 
        isColumnRange, 
        isFixedRange, 
        isEditableCell, 
        cellClickHandlerIndex,
        cellModifierFactory){

        this.#currentRangeStartIdx = startRange;
        this.#currentRangeEndIdx = endRange;
        this.#maxCount = maxCount < 1 ? 1 : maxCount;
        if(maxCount < endRange - startRange + 1){
            this.#maxCount =  endRange - startRange + 1;
        }
        this.#isColumnRange = isColumnRange;
        this.#isFixedRange = isFixedRange;
        this.#isEditableCell = isEditableCell;
        this.#cellClickHandlerIndex = cellClickHandlerIndex;

        console.log(this);
        console.log(cellModifierFactory);
        console.log(cellModifierFactory());
        this.#cellModifiers = cellModifierFactory();
        
    }

    #currentRangeStartIdx = -1;
    get rangeStartIdx() {
        return this.#currentRangeStartIdx;
    }

    #currentRangeEndIdx = -1;
    get rangeEndIdx(){
        return this.#currentRangeEndIdx;
    }

    #maxCount;
    get maxCount(){
        return this.#maxCount;
    }

    #isColumnRange;
    get isColumnRange() {
        return this.#isColumnRange;
    }

    #isFixedRange;
    get isFixedRange() {
        return this.#isFixedRange;
    }

    #isEditableCell;
    get isEditableCell() {
        return this.#isEditableCell;
    }

    #cellClickHandlerIndex;
    get cellClickHandlerIndex() {
        return this.#cellClickHandlerIndex
    }

    #cellModifiers;
    get cellModifier() {
        return this.#cellModifiers;
    }

    isCellStartRangeStart(cellData){
        return this.isColumnRange 
            ? cellData.idx === this.#currentRangeStartIdx
            : cellData.rowIdx === this.#currentRangeStartIdx;
    }

    isCellEndRangeEnd(cellData){
        return this.isColumnRange
            ? cellData.idx === this.#currentRangeEndIdx
            : cellData.rowIdx === this.#currentRangeEndIdx
    }

    canAddCell(cellData){
        return !this.isFixedRange 
            && this.#currentRangeEndIdx - this.#currentRangeStartIdx + 1 < this.maxCount
    }

    canDeleteCell(cellData){
        return !this.isFixedRange 
            && this.#currentRangeEndIdx - this.#currentRangeStartIdx > 0;
    }

    addCell(cellData){
        if(this.#currentRangeStartIdx === -1){
            this.#currentRangeStartIdx = this.isColumnRange ? cellData.idx : cellData.rowIdx;
            this.#currentRangeEndIdx = this.isColumnRange ? cellData.idx : cellData.rowIdx;
        }
        else {
            ++this.#currentRangeEndIdx
        }
    }

    deleteCell(cellData){
        if(this.#currentRangeStartIdx === -1){
            //do nothing
        }
        else {
            --this.#currentRangeEndIdx
        }
    }

    applyCellModifiers(cellData){

        for(let modifierSelectorAndValue of this.#cellModifiers){
            modifierSelectorAndValue.Evaluate(cellData);
        }
        // console.log('>>>after_applyCellModifiers()')
        // console.log(this.#cellModifiers);
        // console.log(cellData);
        return cellData;
    }


    handleClick(cellData){
        this.cellClickHandler(cellData);
    }

    updateIndexesOnOtherRangeAddition(){
        ++this.#currentRangeStartIdx;
        ++this.#currentRangeEndIdx;
    }

    updateIndexesOnOtherRangeDeletion(){
        --this.#currentRangeStartIdx;
        --this.#currentRangeEndIdx;
    }
}

export default range;