function onSave(f) {
  if(f.name.value.trim() === "") {
    alert('책 제목을 적어주세요.')
    f.name.focus();
    return false;
  }
  return true;
}

function onRemove(id) {
  if(confirm('정말 삭제하시겠습니까?')) {
    location.href = '/book/remove/'+id;
  }
}
