(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        .top-nav-container {
            position: fixed;
            top: 30px;
            right: 30px;
            z-index: 1000;
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .contact-btn {
            background: var(--glass);
            backdrop-filter: blur(15px);
            border: 1px solid var(--border);
            color: #fff;
            padding: 10px 25px;
            border-radius: 50px;
            font-size: 0.7rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s ease;
            cursor: none !important;
        }

        .contact-btn:hover {
            background: var(--accent);
            color: #000;
            border-color: var(--accent);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 182, 193, 0.3);
        }

        #contact-toast {
            position: fixed;
            top: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: rgba(8, 8, 8, 0.9);
            backdrop-filter: blur(20px);
            border: 1px solid var(--accent);
            padding: 12px 20px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 999999;
            transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        #contact-toast.show {
            transform: translateX(-50%) translateY(0);
        }
    `;
    document.head.appendChild(style);

    const nav = document.createElement('div');
    nav.className = 'top-nav-container';
    nav.innerHTML = `
        <button onclick="handleContact()" class="contact-btn">Contact</button>
    `;
    document.body.appendChild(nav);
})();

function handleContact() {
    const email = "contact@itxw4sley.xyz";
    
    window.location.href = `mailto:${email}`;

    navigator.clipboard.writeText(email).then(() => {
        showToast(email);
    });
}

function showToast(email) {
    if (document.getElementById('contact-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'contact-toast';
    toast.innerHTML = `
        <div style="background: var(--accent); rounded-full; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <div>
            <p style="text-transform: uppercase; font-size: 8px; letter-spacing: 1px; font-weight: 800; opacity: 0.6; margin: 0;">Copied</p>
            <p style="font-size: 12px; font-weight: 700; margin: 0;">${email}</p>
        </div>
    `;

    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 600);
    }, 3000);
}
