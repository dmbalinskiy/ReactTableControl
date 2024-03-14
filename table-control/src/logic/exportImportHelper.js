import { cellModifierSelectorAndValue } from './cellModifierSelectorAndValue';
import { cellModifierSelectorComplex } from './cellModifierSelectorComplex';
import { cellModifierSelectorSimple } from './cellModifierSelectorSimple';
import { cellModifierValue } from './cellModifierValue';
import range from './range';
import rangeManager from './rangeManager';

const Replicator = require('replicator')

export class exportImportHelper {
    static async handleExport(tableData){
        try{
            const opts = {
                types: [
                  {
                    description: "Text file",
                    accept: { "text/plain": [".txt"] },
                  },
                ],
                multiple:false,
              };
            let fileSavePicker = await window.showSaveFilePicker(opts);

            const replicator = new Replicator();
            replicator.addTransforms(this.getReplicatorTransforms());
            const str = replicator.encode({tableData});

            const writable = await fileSavePicker.createWritable();
            await writable.write(str);
            await writable.close();
        }
        catch(error){
            console.error(error);
        }
    }

    static async handleImport(){
        try{
            const pickerOpts = {
                types: [
                  {
                    description: "Text file",
                    accept: { "text/plain": [".txt"] },
                  },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
              };
            
              const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
              const fileData = await fileHandle.getFile();
              let str = await fileData.text();

              const replicator = new Replicator();
              replicator.addTransforms(this.getReplicatorTransforms());

              return replicator.decode(str);
        }
        catch(error){
            console.log(error);
        }
    }

    static getReplicatorTransforms(){
        return [
            {
                type: 'range',
                shouldTransform (type, val) {
                    return val instanceof range;
                },
        
                toSerializable (range) {
                    let obj =  {
                        rangeStartIdx: range.rangeStartIdx,
                        rangeEndIdx: range.rangeEndIdx,
                        maxCount: range.maxCount,
                        isColumnRange: range.isColumnRange,
                        isFixedRange: range.isFixedRange,
                        isEditableCell: range.isEditableCell,
                        cellClickHandlerIndex: range.cellClickHandlerIndex,
                        cellModifiers: range.cellModifiers,
                    }
                    return obj;
                },
        
                fromSerializable (val){
                    return new range(
                        val.rangeStartIdx,
                        val.rangeEndIdx,
                        val.maxCount,
                        val.isColumnRange,
                        val.isFixedRange,
                        val.isEditableCell,
                        val.cellClickHandlerIndex,
                        val.cellModifiers,
                    )
                }
            },
            {
                type: 'rangeManager',
                shouldTransform (type, val) {
                    console.log(val);
                    return val instanceof rangeManager;
                },
        
                toSerializable (rangeManager) {
                    let obj =  {
                        isColumnRange : rangeManager.isColumnRange,
                        ranges : rangeManager.ranges,
                    }
                    return obj;
                },
        
                fromSerializable (val){
                    return new rangeManager(
                        val.isColumnRange,
                        val.ranges
                    )
                }
            },
            {
                type : "cellModifierValue",
                shouldTransform(type, val) {
                    return val instanceof cellModifierValue;
                },
                toSerializable(cellModifierValue) {
                    return cellModifierValue.ToObject();
                },
                fromSerializable(val){
                    let value = new cellModifierValue();
                    value.FromObject(val);
                    return value;
                }
            },
            {
                type: "cellModifierSelectorAndValue",
                shouldTransform(type, val) {
                    return val instanceof cellModifierSelectorAndValue;
                },
                toSerializable(cellModifierSelectorAndValue){
                    return cellModifierSelectorAndValue.ToObject();
                },
                fromSerializable(val){
                    let value = new cellModifierSelectorAndValue();
                    value.FromObject(val);
                    return value;
                }
            },
            {
                type: "cellModifierSelectorSimple",
                shouldTransform(type, val){
                    return val instanceof cellModifierSelectorSimple;
                },
                toSerializable(cellModifierSelectorSimple){
                    return cellModifierSelectorSimple.ToObject();
                },
                fromSerializable(val){
                    let value = new cellModifierSelectorAndValue();
                    value.FromObject(val);
                    return value;
                }
            },
            {
                type: "cellModifierSelectorComplex",
                shouldTransform(type, val){
                    return val instanceof cellModifierSelectorComplex;
                },
                toSerializable(cellModifierSelectorComplex){
                    return cellModifierSelectorComplex.ToObject();
                },
                fromSerializable(val){
                    let value = new cellModifierSelectorComplex();
                    value.FromObject(val);
                    return value;
                }
            }

        ];
    }
}