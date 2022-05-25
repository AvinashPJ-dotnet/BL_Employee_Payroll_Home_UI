window.addEventListener('DOMContentLoaded',(event)=>{
    createInnerHtml();
});

const createInnerHtml = ()=>{
    const headerTable = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Action</th>
    </tr>`
    const innerHtml =`${headerTable}
    <tr>
        <td>
            <img class="profile" alt="" src="assets\\profile-images\\Ellipse -3.png">
        </td>
        <td>Avinash</td>
        <td>Male</td>
        <td><div class="dept-label">HR</div>
            <div class="dept-label">Market</div></td>
        <td>300000</td>
        <td>1 Nov 2022</td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="assets\\icons\\delete-black-18dp.svg">
            <img id="1" onclick="update(this)" alt="edit" src="assets\\icons\\create-black-18dp.svg">
        </td>
    </tr>
`;
document.querySelector('#table-display').innerHTML = innerHtml;
}