class EmployeePayrollData{
    get id(){return this._id;}
    set id(id){this._id = id;}

    get name(){return this._name;}
    set name(newName){
        let nameRegex = RegExp(/^[A-Z]{1}[a-zA-Z\\s]{2,}/);
        if(nameRegex.test(newName)){
            this._name = newName;
        }
        else throw 'Name is Incorrect!';
    }

    get profilePic(){return this._profilePic;}
    set profilePic(profilePic){this._profilePic = profilePic;}


    get gender(){return this._gender;}
    set gender(gender){this._gender = gender;}

    get department(){return this._department;}
    set department(department){this._department = department;}

    get salary(){return this._salary;}
    set salary(salary){this._salary = salary;}

    get note(){return this._note;}
    set note(note){this._note = note;}

    get startDate(){return this._startDate;}
    set startDate(startDate){this._startDate = startDate;}


    toString(){
        const option = {year:'numeric', month:'long', day:'numeric'};
        // const empData = !this._startDate ? "undefined" : this._startDate.toLocalDateString("en-US",option);
        return "id ="+this._id+" name ="+this._name+" gender ="+this._gender+"profilePic ="+this._profilePic+"salary ="+this._salary+
        " department ="+this._department+" note ="+this._note+" start date ="+this._startDate ;
    }
}


let isUpdate = false;
let employeePayrollObj = {};


window.addEventListener('DOMContentLoaded',(event)=>{
    const nameValue = document.querySelector('#name');
    const textError = document.querySelector('.text-error')
    let employeePayrollData = new EmployeePayrollData();
    nameValue.addEventListener('input',function () {
        if(nameValue.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            // (new EmployeePayrollData()).name = nameValue.value;
            employeePayrollData.name = nameValue.value;
            textError.textContent = "";

        }catch(e){
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const salaryError = document.querySelector('.salary-output')
    salaryError.textContent = salary.value;
    salary.addEventListener('input',function () {
        salaryError.textContent = salary.value;
    });

    checkForUpdate();
})

const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStoreage(employeePayrollData);
    } catch (error) {
        alert(error)
    }
}

// Local storage
function createAndUpdateStoreage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!= undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList  = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const createEmployeePayroll = () =>{
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');

    } catch (e) {
        setTextValue('.text-error',e);
    }
    employeePayrollData.id = new Date().getTime()+1;
    employeePayrollData.profilePic = getSelectedRadioValues('input[name=profile]:checked');
    employeePayrollData.gender = getSelectedRadioValues('input[name=gender]:checked');
    employeePayrollData.department = getSelectedCheckBoxValues('input[name=department]:checked');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day')+""+getInputValueById('#month')+""+getInputValueById('#year');
    employeePayrollData.startDate = Date.parse(date);
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const checkForUpdate = ()=> {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return ;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}



const getSelectedRadioValues = (propertyValue)=>{
    let selectedItem = document.querySelector(propertyValue).value;
    if(selectedItem != null){
        return selectedItem;
    }
    return null;
}

const getSelectedCheckBoxValues = (propertyValue)=>{
    let selectedItem = document.querySelectorAll(propertyValue);
    let setItems = [];
    if(selectedItem != null){
        selectedItem.forEach(item =>{
            if(item.checked){
                setItems.push(item.value);
            }
        })
    }
    return setItems;
}

const getInputValueById = (id) =>{
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) =>{
    let value = document.getElementById(id).value;
    return value;
}

//setform values
const setForm = () =>{
    setValue('#name', employeePayrollObj._name);
    setSelectedValue('[name = profile]', employeePayrollObj._profilePic);
    setSelectedValue('[name = gender]', employeePayrollObj._gender);
    setSelectedValue('[name = department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

//reset form values
const resetForm = ()=>{
    setValue('#name','');
    unsetSelectedValue('[name = profile]');
    unsetSelectedValue('[name = gender]');
    unsetSelectedValue('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2022');
}

const setValue = (id , value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const unsetSelectedValue = (propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}

const setTextValue = (id , value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setSelectedValue = (propertyValue, value)=> {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}


