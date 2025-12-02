/* script.js */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DATA STRUCTURE ---
    const resumeData = {
        personalInfo: {
            name: "Aditya Kumar Singh",
            titles: ["ML Engineer...","Deep Learning...", "Researcher..."],
            socials: [
                { name: "LinkedIn", url: "https://linkedin.com/in/adi1220", icon: "fab fa-linkedin" },
                { name: "GitHub", url: "https://github.com/adi1220", icon: "fab fa-github" },
                { name: "Kaggle", url: "https://kaggle.com/aditya1220", icon: "fab fa-kaggle" },
                { name: "Email", url: "mailto:adi12679.as@gmail.com", icon: "fas fa-envelope" }
            ]
        },
        experience: [
            {
                role: "Software Engineer (Machine Learning)",
                company: "Samsung Research Institute Delhi",
                duration: "Jul 2022 – Present",
                description: "Delivered production-grade ML/DL solutions spanning Computer Vision, Audio AI, and Agentic AI—from research and prototyping to deployment and commercialization."
            },
            {
                role: "Software Engineer Intern",
                company: "Samsung Research Institute Delhi",
                duration: "Jan 2022 – Jun 2022",
                description: "Deployed DBNet for real-time on-device text recognition in live video, achieving 85% accuracy under resource constraints."
            },
            {
                role: "Research Intern",
                company: "IIIT Allahabad",
                duration: "May 2021 – Jul 2021",
                description: "Developed multimodal models combining VGG16 (visual) and Bi-LSTM (textual) features to improve hate speech detection accuracy."
            }
        ],
        projects: [
            {
                name: "On-Device Sound Event Detection",
                category: "Samsung R&D Project",
                description: "A 500KB model with a 94.8% F1-score for real-time on-device sound detection.",
                // links: { "Code": "https://github.com/adi1220" /* Update with specific link */, "Paper": "#" /* Add link */ }
            },
            {
                name: "Facial Keypoint Detection",
                category: "Computer Vision Nanodegree Project",
                description: "A CNN model to detect facial keypoints, supplemented with a one-shot SVM+HOG detector.",
                links: { "Code": "https://github.com/adi1220/Facial-Keypoint-Detection-Project" /* Update with specific link */ }
            },
            {
                name: "Automatic Image Captioning",
                category: "Computer Vision Nanodegree Project",
                description: "An image captioning model using a CNN encoder (LeNet) and an LSTM decoder.",
                links: { "Code": "https://github.com/adi1220/Image-Captioning-" /* Update with specific link */ }
            },
             {
                name: "Hate Speech Detection",
                category: "Research",
                description: "Multimodal models analysis combining VGG16,Resnet-50 and Bi-LSTM,Stacked-LSTM to improve hate speech detection.",
                // links: { "Code": "#" /* Add link to paper */ }
            },
            {
                name: "Patent: Spatio-Temporal Visual Cue",
                category: "Research",
                description: "Published patent for a system and method for generating aligned multi-event visual cues. (ID: WI-202406-32-1-IN0)",
                // links: { "View": "#" /* Add link to patent */ }
            }
        ],
        skills: [
            { name: "C++", description: "Multithreading, Design Patterns" },
            { name: "Python", description: "Expert proficiency" },
            { name: "PyTorch", description: "Deep Learning Framework" },
            { name: "TensorFlow", description: "TFLite, ONNX" },
            { name: "Model Optimization", description: "Quantization, Pruning, Distillation" },
            { name: "Computer Vision & NLP", description: "YOLO, OCR, CNNs, Transformers, LSTMs, Librosa" },
            { name: "Real-time Inference", description: "Low-latency pipelines" },
            { name: "Databases", description: "MongoDB, Neo4j" },
        ]
    };

    // --- 2. DYNAMIC RENDERING ---

    // Social Links
    const socialLinksContainer = document.getElementById('social-links');
    const footerSocials = document.getElementById('footer-social-links');
    resumeData.personalInfo.socials.forEach(social => {
        const link = `<a href="${social.url}" target="_blank" rel="noopener noreferrer" aria-label="${social.name}"><i class="${social.icon}"></i></a>`;
        socialLinksContainer.innerHTML += link;
        footerSocials.innerHTML += link;
    });

    // Experience Timeline
    const timelineContainer = document.getElementById('experience-timeline');
    resumeData.experience.forEach(item => {
        const timelineItem = `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h3>${item.role}</h3>
                    <p><strong>${item.company}</strong> | ${item.duration}</p>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        timelineContainer.innerHTML += timelineItem;
    });

    // Projects Grid
    const projectsGrid = document.getElementById('projects-grid');
    resumeData.projects.forEach(project => {
        let linksHTML = '';
        const links = project.links || {};               // ← guard when links undefined
        for (const [key, value] of Object.entries(links)) {
            linksHTML += `<a href="${value}" target="_blank" rel="noopener noreferrer">${key}</a>`;
        }
        const projectCard = `
            <div class="bento-card">
                <h3>${project.name}</h3>
                <p><em>${project.category}</em></p>
                <p>${project.description}</p>
                <div class="links">${linksHTML}</div>
            </div>
        `;
        projectsGrid.innerHTML += projectCard;
    });


    // Skills Grid
    const skillsGrid = document.getElementById('skills-grid');
    resumeData.skills.forEach(skill => {
        const skillCard = `
            <div class="bento-card">
                <h3>${skill.name}</h3>
                <p>${skill.description}</p>
            </div>
        `;
        skillsGrid.innerHTML += skillCard;
    });


    // --- 3. INTERSECTION OBSERVER for scroll animations ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // --- 4. TYPEWRITER EFFECT ---
    const typewriterEl = document.querySelector('.typewriter');
    let textArray = [];
    if (typewriterEl) {
        try {
            textArray = JSON.parse(typewriterEl.getAttribute('data-text') || '[]');
        } catch (e) {
            console.error('typewriter data-text JSON parse error:', e);
            textArray = [];
        }
    }
    
    if (typewriterEl && textArray.length) {
        let textIndex = 0;
        let charIndex = 0;
        function type() {
            if (charIndex < textArray[textIndex].length) {
                typewriterEl.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, 100);
            } else {
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            if (charIndex > 0) {
                typewriterEl.textContent = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 50);
            } else {
                textIndex = (textIndex + 1) % textArray.length;
                setTimeout(type, 500);
            }
        }
        type();
    }



    // --- 5. CANVAS API - Particle Network ---
    const canvas = document.getElementById('neural-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 80) * (canvas.width / 80)
    };

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(0, 255, 255, 0.5)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                               ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacityValue})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }
    
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.width/80));
        init();
    });

    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    init();
    animate();
    
    // --- 6. GITHUB API INTEGRATION (BONUS) ---
    async function fetchGitHubStats(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();            // ← parse JSON here
            console.log(`GitHub Public Repos: ${data.public_repos}`);
            // inject into DOM if needed
        } catch (error) {
            console.error('Failed to fetch GitHub stats:', error);
        }
    }
    fetchGitHubStats('adi1220');


    // Call the function with your GitHub username
    fetchGitHubStats('adi1220');

});
