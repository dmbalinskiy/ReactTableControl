import { useState, useRef, useEffect } from 'react'

import './serializationBar.css'
import Button from "../button/button";

function SerializationBar({table}) {

    return (
        <div className="bar">
             <Button handler={
                    async () => { 
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
                            console.log('>>>>>');
                            console.log(fileSavePicker);
                            console.log(table);

                            let textToSave = 'my_simple_text-to-save....'//table.getTableData();
                            console.log('textToSave');
                            console.log(textToSave);

                            textToSave = 'my_simple_text-to-save....';

                            const writable = await fileSavePicker.createWritable();
                            console.log(writable);
                            await writable.write(textToSave);
                            console.log(textToSave);
                            await writable.close();
                        }
                        catch(error){
                            console.error(error);
                        }
                    }
                }
                type='button export'
                text='Do export of the current table data'
                isEnabled={true}/>

             <Button handler={
                    async () => { 
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
                              let text = await fileData.text();

                              console.log(text);
                              table.applyTableData(text);
                        }
                        catch(error){
                            console.log(error);
                        }
                    }
                }
                type='button import'
                text='Do import of the current table data'
                isEnabled={true}/>
        </div>
    )
}

export default SerializationBar