const LOGIN = { username: 'mai', password: '1442008' };
const messages = [
  'إنتِ مش مطالبة تبقي قوية طول الوقت. خدي وقتك واهدي، وبكرة يبقى أخف 🤍',
  'طيبتك وحنانك حاجات جميلة فيكي، ومش لازم يوم وحش يخليكي تنسي ده 🌷',
  'لو النهار تقيل، صغّريه: أغنية حلوة، مشروب تحبيه، شوية هدوء… وخلاص ☕🎧',
  'دموعك غالية، وزعلك له قيمة. متستخفيش بنفسك ولا بمشاعرك 💧',
  'مش كل حاجة لازم تتحل النهارده. أحيانًا إنك تعدّي اليوم بهدوء يبقى إنجاز كبير 🌱',
  'فاكرة إن بعد كل مود وحش بييجي مود أحسن؟ أهو ده المطلوب نصدقه دلوقتي ✨'
];

const loginScreen = document.getElementById('loginScreen');
const mainScreen = document.getElementById('mainScreen');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const toast = document.getElementById('toast');

function showToast(text){
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove('show'), 2800);
}
function showMain(){
  loginScreen.classList.add('hidden');
  mainScreen.classList.remove('hidden');
  localStorage.setItem('mei_logged_in','1');
}
function logout(){
  localStorage.removeItem('mei_logged_in');
  mainScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  loginForm.reset();
  document.getElementById('username').value = LOGIN.username;
  document.getElementById('password').value = LOGIN.password;
}

loginForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value;
  if(u === LOGIN.username && p === LOGIN.password){ loginError.textContent=''; showMain(); showToast('أهلاً يا مي ✨'); }
  else loginError.textContent='اسم المستخدم أو كلمة المرور مش صح.';
});

document.getElementById('logoutBtn').addEventListener('click', logout);

const audioPlayer = document.getElementById('audioPlayer');
const nowPlaying = document.getElementById('nowPlaying');
const songButtons = document.querySelectorAll('.song[data-src]');

songButtons.forEach((button)=>{
  button.addEventListener('click',()=>{
    const src = button.dataset.src;
    const title = button.dataset.title || 'أغنية';
    audioPlayer.src = encodeURI(src);
    nowPlaying.textContent = title;
    audioPlayer.play().catch(()=>{});
    songButtons.forEach((item)=>item.classList.remove('active'));
    button.classList.add('active');
  });
});

audioPlayer.addEventListener('ended',()=>{
  const currentIndex = [...songButtons].findIndex((button)=>button.classList.contains('active'));
  const next = songButtons[currentIndex + 1];
  if(next) next.click();
});

document.getElementById('messageBtn').addEventListener('click',()=>{
  const msg = messages[Math.floor(Math.random()*messages.length)];
  showToast(msg);
});

if(localStorage.getItem('mei_logged_in')==='1') showMain();
