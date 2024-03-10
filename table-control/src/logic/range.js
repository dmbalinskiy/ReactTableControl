// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
//   // Getter
//   get area() {
//     return this.calcArea();
//   }
//   // Method
//   calcArea() {
//     return this.height * this.width;
//   }
//   *getSides() {
//     yield this.height;
//     yield this.width;
//     yield this.height;
//     yield this.width;
//   }
// }

// const square = new Rectangle(10, 10);

// console.log(square.area); // 100
// console.log([...square.getSides()]); // [10, 10, 10, 10]

//range for horizontal/vertical cell groups
//can combine
export class range {
    constructor (maxCount, isColumnRange, isFixedRange, isEditableCell, cellClickHandler){
        this.maxCount = maxCount < 1 ? 1 : maxCount;
        this.isColumnRange = isColumnRange;
        this.isFixedRange = isFixedRange;
        this.isEditableCell = isEditableCell;
        this.cellClickHandler = cellClickHandler;
    }

    get rangeStartIdx() {
        return this.#currentRangeStartIdx;
    }

    get rangeEndIdx(){
        return this.#currentRangeEndIdx;
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
            && this.#currentRangeEndIdx - this.#currentRangeStartIdx < this.maxCount
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

    updateIndexesOnOtherRangeAddition(){
        ++this.#currentRangeStartIdx;
        ++this.#currentRangeEndIdx;
    }

    updateIndexesOnOtherRangeDeletion(){
        --this.#currentRangeStartIdx;
        --this.#currentRangeEndIdx;
    }

    #currentRangeStartIdx = -1;
    #currentRangeEndIdx = -1;
}

export default range;