let taskList = [];
let badList = [];
const hrPerWek = 24 * 7;

const handleOnSubmit = (e) => {
  const frmData = new FormData(e);

  const task = frmData.get("task");
  const hr = +frmData.get("hr");

  const obj = {
    task,
    hr,
  };
const totalTaskHrs = taskList.reduce((acc,item)=>{
  return acc+item.hr
},0)
const total = totalTaskHrs+hr;
if(total>hrPerWek){
  return alert("Sorry you cannot add more hour")

}

  taskList.push(obj);
  console.log(taskList);
  display();
  totalTaskHours();
};

const displayBadList = () => {
  let str = "";
badList.map((item,i)=>{
  str+=`<tr>

  <th scope="row">${i + 1}</th>
  <td>${item.task}</td>
  <td>${item.hr}</td>
  <td>
    <button  onclick ="markAstodo(${i})"class="btn btn-success">
      <i class="fa-solid fa-arrow-left-long"></i>
    </button>
    <button onclick ="deleteBadItem(${i})"class="btn btn-danger">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
</tr>`
  
});

document.getElementById("bad-list").innerHTML = str;
  totalTaskHours();
  totalBadHours();
}

const display = () => {
  let str =""
  taskList.map((item, i) => {
    str += `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${item.task}</td>
        <td>${item.hr}hr</td>
        <td>
          <button onclick ="deleteItem(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button onclick ="markAsNottodo(${i})" class="btn btn-success">
            <i class="fa-solid fa-arrow-right-long"></i>
          </button>
        </td>
      </tr>`;
  });

  document.getElementById("task-list").innerHTML = str;
  totalTaskHours();
};
 
const totalTaskHours =()=>{
  const total = taskList.reduce((acc, item)=>{
    return acc+item.hr;
  },0)
  document.getElementById('totalHrs').innerText= total+totalBadHours();
  

};
const totalBadHours =()=>{
  const total = badList.reduce((subTtl,item)=>{
    return subTtl+item.hr;
  },0)
  document.getElementById("totalBadHours").innerText=total;
  return total;
};

const deleteItem = i=>{
  if(!window.confirm("are you sure you want to delete it")){
    return;
  }
  console.log(i);
  const temArray = taskList.filter((item,index)=>{
    return i!== index;
  });
  taskList = temArray;
  display();
};

const markAsNottodo = (i)=>{
  const itm = taskList.splice(i,1)[0];
  badList.push(itm);
  displayBadList();
  display();
  console.log(badList,taskList);
};
const deleteBadItem = i=>{
  if(!window.confirm("are you sure you want to delete it")){
    return;
  }
  console.log(i);
  const temArray = badList.filter((item,index)=>{
    return i!== index;
  });
  badList = temArray;
  displayBadList();
};

const markAstodo = (i)=>{
  const itm = badList.splice(i,1)[0];
  taskList.push(itm);
  displayBadList();
  display();
  console.log(taskList,badList);
};