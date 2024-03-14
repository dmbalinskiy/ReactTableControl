import { addIfNotContains, removeIfContains } from './utils';

export class range {
    constructor (
        startRange, 
        endRange, 
        maxCount, 
        isColumnRange, 
        isFixedRange, 
        isEditableCell, 
        cellClickHandlerIndex,
        cellModifiers){

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

        this.#cellModifiers = cellModifiers;
        
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
    get cellModifiers() {
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
        return cellData;
    }


    handleClick(cellData){
        if(this.#cellClickHandlerIndex !== 1)
            return false;

        this.cellDataClickHandler(cellData);
        return true;
    }

    updateIndexesOnOtherRangeAddition(){
        ++this.#currentRangeStartIdx;
        ++this.#currentRangeEndIdx;
    }

    updateIndexesOnOtherRangeDeletion(){
        --this.#currentRangeStartIdx;
        --this.#currentRangeEndIdx;
    }

    cellDataClickHandler (cellData) {

        cellData.classes = removeIfContains('ok', cellData.classes); 
        cellData.classes = removeIfContains('warning', cellData.classes); 
        cellData.classes = removeIfContains('error', cellData.classes); 
      
        if(!cellData.text || cellData.text === ""){
          cellData.text = '10';
          cellData.classes = addIfNotContains('ok', cellData.classes);
        }
        else if(cellData.text === '10'){
          cellData.text = '11';
          cellData.classes = addIfNotContains('warning', cellData.classes);
        }
        else if(cellData.text === '11'){
          cellData.text = '01';
          cellData.classes = addIfNotContains('error', cellData.classes);
        }
        else if(cellData.text === '01'){
          cellData.text = '';
        }
      }
}

export default range;