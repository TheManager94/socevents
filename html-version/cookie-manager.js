/**
 * SOC Events - GDPR Compliant Cookie Manager
 * Handles cookie consent and data protection compliance
 */

class CookieManager {
    constructor() {
        this.cookieCategories = {
            necessary: {
                name: 'Notwendige Cookies',
                description: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich.',
                required: true,
                cookies: ['socevents_consent', 'socevents_preferences']
            },
            analytics: {
                name: 'Analytische Cookies',
                description: 'Helfen uns zu verstehen, wie Besucher unsere Website nutzen.',
                required: false,
                cookies: ['_ga', '_gid', '_gat', 'socevents_analytics']
            },
            marketing: {
                name: 'Marketing Cookies',
                description: 'Werden verwendet, um Ihnen relevante Werbung zu zeigen.',
                required: false,
                cookies: ['socevents_marketing', 'facebook_pixel', 'google_ads']
            },
            preferences: {
                name: 'Präferenz Cookies',
                description: 'Ermöglichen es der Website, sich an Ihre Einstellungen zu erinnern.',
                required: false,
                cookies: ['socevents_theme', 'socevents_language']
            }
        };

        this.consentData = this.loadConsent();
        this.init();
    }

    init() {
        this.createCookieBanner();
        this.createCookieSettings();
        this.bindEvents();

        // Show banner if no consent given
        if (!this.consentData.hasConsent) {
            this.showCookieBanner();
        } else {
            this.applyCookieSettings();
        }
    }

    createCookieBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h3>🍪 Cookies & Datenschutz</h3>
                    <p>Wir verwenden Cookies, um Ihnen die beste Erfahrung auf unserer Website zu bieten.
                    Einige Cookies sind notwendig für die Funktion der Website, während andere uns helfen,
                    die Website zu verbessern und Ihnen personalisierte Inhalte anzuzeigen.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="accept-all-cookies" class="cookie-btn primary">
                        Alle akzeptieren
                    </button>
                    <button id="accept-necessary-cookies" class="cookie-btn secondary">
                        Nur notwendige
                    </button>
                    <button id="cookie-settings-btn" class="cookie-btn tertiary">
                        Einstellungen
                    </button>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
                #cookie-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(135deg, #1f2937, #374151);
                    color: white;
                    padding: 1.5rem;
                    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    border-top: 3px solid #a3e635;
                    transform: translateY(100%);
                    transition: transform 0.3s ease;
                }

                #cookie-banner.show {
                    transform: translateY(0);
                }

                .cookie-banner-content {
                    max-width: 72rem;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 2rem;
                }

                @media (max-width: 768px) {
                    .cookie-banner-content {
                        flex-direction: column;
                        text-align: center;
                    }
                }

                .cookie-banner-text h3 {
                    color: #a3e635;
                    margin-bottom: 0.5rem;
                    font-size: 1.125rem;
                }

                .cookie-banner-text p {
                    color: #d1d5db;
                    line-height: 1.5;
                    margin: 0;
                }

                .cookie-banner-actions {
                    display: flex;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }

                @media (max-width: 768px) {
                    .cookie-banner-actions {
                        justify-content: center;
                        width: 100%;
                    }
                }

                .cookie-btn {
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .cookie-btn.primary {
                    background: #a3e635;
                    color: #000;
                }

                .cookie-btn.primary:hover {
                    background: #84cc16;
                    transform: translateY(-2px);
                }

                .cookie-btn.secondary {
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                }

                .cookie-btn.secondary:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-color: rgba(255, 255, 255, 0.5);
                }

                .cookie-btn.tertiary {
                    background: transparent;
                    color: #a3e635;
                    border: 2px solid #a3e635;
                }

                .cookie-btn.tertiary:hover {
                    background: rgba(163, 230, 53, 0.1);
                }

                /* Cookie Settings Modal */
                #cookie-settings-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 10001;
                    display: none;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                }

                .cookie-settings-content {
                    background: #1f2937;
                    border-radius: 1rem;
                    padding: 2rem;
                    max-width: 48rem;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    border: 1px solid #374151;
                }

                .cookie-settings-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .cookie-settings-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #a3e635;
                }

                .cookie-close {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0.25rem;
                }

                .cookie-close:hover {
                    color: white;
                }

                .cookie-category {
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .cookie-category-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .cookie-category-name {
                    font-weight: bold;
                    color: #a3e635;
                }

                .cookie-toggle {
                    position: relative;
                    width: 3rem;
                    height: 1.5rem;
                    background: #6b7280;
                    border-radius: 0.75rem;
                    border: none;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .cookie-toggle.enabled {
                    background: #a3e635;
                }

                .cookie-toggle.disabled {
                    background: #6b7280;
                    cursor: not-allowed;
                }

                .cookie-toggle::after {
                    content: '';
                    position: absolute;
                    top: 0.125rem;
                    left: 0.125rem;
                    width: 1.25rem;
                    height: 1.25rem;
                    background: white;
                    border-radius: 50%;
                    transition: transform 0.3s ease;
                }

                .cookie-toggle.enabled::after {
                    transform: translateX(1.5rem);
                }

                .cookie-category-description {
                    color: #d1d5db;
                    font-size: 0.875rem;
                    line-height: 1.5;
                }

                .cookie-settings-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Cookie Preferences Link */
                .cookie-preferences-link {
                    position: fixed;
                    bottom: 1rem;
                    left: 1rem;
                    background: rgba(31, 41, 55, 0.9);
                    color: #a3e635;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-size: 0.875rem;
                    z-index: 1000;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(163, 230, 53, 0.3);
                }

                .cookie-preferences-link:hover {
                    background: rgba(163, 230, 53, 0.1);
                    border-color: #a3e635;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
        document.body.appendChild(banner);
    }

    createCookieSettings() {
        const modal = document.createElement('div');
        modal.id = 'cookie-settings-modal';
        modal.innerHTML = `
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2 class="cookie-settings-title">Cookie-Einstellungen</h2>
                    <button class="cookie-close">&times;</button>
                </div>

                <p style="color: #d1d5db; margin-bottom: 1.5rem;">
                    Wir verwenden verschiedene Arten von Cookies für unterschiedliche Zwecke.
                    Sie können wählen, welche Kategorien Sie zulassen möchten.
                </p>

                <div id="cookie-categories">
                    ${Object.entries(this.cookieCategories).map(([key, category]) => `
                        <div class="cookie-category">
                            <div class="cookie-category-header">
                                <span class="cookie-category-name">${category.name}</span>
                                <button class="cookie-toggle ${category.required ? 'enabled disabled' : ''}"
                                        data-category="${key}"
                                        ${category.required ? 'disabled' : ''}></button>
                            </div>
                            <p class="cookie-category-description">${category.description}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="cookie-settings-actions">
                    <button id="save-cookie-settings" class="cookie-btn primary">
                        Einstellungen speichern
                    </button>
                    <button id="cancel-cookie-settings" class="cookie-btn secondary">
                        Abbrechen
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add preferences link
        const preferencesLink = document.createElement('a');
        preferencesLink.href = '#';
        preferencesLink.className = 'cookie-preferences-link';
        preferencesLink.textContent = '🍪 Cookie-Einstellungen';
        preferencesLink.onclick = (e) => {
            e.preventDefault();
            this.showCookieSettings();
        };
        document.body.appendChild(preferencesLink);
    }

    bindEvents() {
        // Banner buttons
        document.getElementById('accept-all-cookies').onclick = () => this.acceptAllCookies();
        document.getElementById('accept-necessary-cookies').onclick = () => this.acceptNecessaryCookies();
        document.getElementById('cookie-settings-btn').onclick = () => this.showCookieSettings();

        // Settings modal
        document.getElementById('save-cookie-settings').onclick = () => this.saveCookieSettings();
        document.getElementById('cancel-cookie-settings').onclick = () => this.hideCookieSettings();
        document.querySelector('.cookie-close').onclick = () => this.hideCookieSettings();

        // Toggle buttons
        document.querySelectorAll('.cookie-toggle:not(.disabled)').forEach(toggle => {
            toggle.onclick = () => this.toggleCategory(toggle.dataset.category);
        });

        // Close modal on outside click
        document.getElementById('cookie-settings-modal').onclick = (e) => {
            if (e.target.id === 'cookie-settings-modal') {
                this.hideCookieSettings();
            }
        };
    }

    showCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        setTimeout(() => banner.classList.add('show'), 100);
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        banner.classList.remove('show');
    }

    showCookieSettings() {
        this.updateSettingsModal();
        document.getElementById('cookie-settings-modal').style.display = 'flex';
    }

    hideCookieSettings() {
        document.getElementById('cookie-settings-modal').style.display = 'none';
    }

    updateSettingsModal() {
        // Update toggle states based on current consent
        Object.keys(this.cookieCategories).forEach(category => {
            const toggle = document.querySelector(`[data-category="${category}"]`);
            if (toggle && !toggle.disabled) {
                const isEnabled = this.consentData.categories[category] === true;
                toggle.classList.toggle('enabled', isEnabled);
            }
        });
    }

    toggleCategory(category) {
        const toggle = document.querySelector(`[data-category="${category}"]`);
        const isEnabled = toggle.classList.contains('enabled');
        toggle.classList.toggle('enabled', !isEnabled);
    }

    acceptAllCookies() {
        this.setConsent({
            hasConsent: true,
            consentDate: new Date().toISOString(),
            categories: {
                necessary: true,
                analytics: true,
                marketing: true,
                preferences: true
            }
        });
        this.hideCookieBanner();
        this.applyCookieSettings();
    }

    acceptNecessaryCookies() {
        this.setConsent({
            hasConsent: true,
            consentDate: new Date().toISOString(),
            categories: {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            }
        });
        this.hideCookieBanner();
        this.applyCookieSettings();
    }

    saveCookieSettings() {
        const categories = {};
        Object.keys(this.cookieCategories).forEach(category => {
            const toggle = document.querySelector(`[data-category="${category}"]`);
            if (this.cookieCategories[category].required) {
                categories[category] = true;
            } else {
                categories[category] = toggle ? toggle.classList.contains('enabled') : false;
            }
        });

        this.setConsent({
            hasConsent: true,
            consentDate: new Date().toISOString(),
            categories: categories
        });

        this.hideCookieSettings();
        this.hideCookieBanner();
        this.applyCookieSettings();
    }

    setConsent(consentData) {
        this.consentData = consentData;
        localStorage.setItem('socevents_cookie_consent', JSON.stringify(consentData));

        // Set consent cookie (necessary cookie)
        this.setCookie('socevents_consent', 'true', 365);
    }

    loadConsent() {
        const stored = localStorage.getItem('socevents_cookie_consent');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Error loading cookie consent:', e);
            }
        }

        return {
            hasConsent: false,
            categories: {
                necessary: true,
                analytics: false,
                marketing: false,
                preferences: false
            }
        };
    }

    applyCookieSettings() {
        // Remove all non-necessary cookies if not consented
        Object.entries(this.cookieCategories).forEach(([category, data]) => {
            if (!data.required && !this.consentData.categories[category]) {
                // Remove cookies from this category
                data.cookies.forEach(cookieName => {
                    this.deleteCookie(cookieName);
                });
            }
        });

        // Apply settings to third-party services
        this.configureAnalytics();
        this.configureMarketing();
        this.configurePreferences();

        // Dispatch event for other scripts
        window.dispatchEvent(new CustomEvent('cookieConsentUpdated', {
            detail: this.consentData
        }));
    }

    configureAnalytics() {
        if (this.consentData.categories.analytics) {
            // Enable Google Analytics (example)
            console.log('Analytics cookies enabled');
            // window.gtag && window.gtag('consent', 'update', { analytics_storage: 'granted' });
        } else {
            console.log('Analytics cookies disabled');
            // window.gtag && window.gtag('consent', 'update', { analytics_storage: 'denied' });
        }
    }

    configureMarketing() {
        if (this.consentData.categories.marketing) {
            // Enable marketing cookies
            console.log('Marketing cookies enabled');
            // window.gtag && window.gtag('consent', 'update', { ad_storage: 'granted' });
        } else {
            console.log('Marketing cookies disabled');
            // window.gtag && window.gtag('consent', 'update', { ad_storage: 'denied' });
        }
    }

    configurePreferences() {
        if (this.consentData.categories.preferences) {
            // Enable preference cookies
            console.log('Preference cookies enabled');
        } else {
            console.log('Preference cookies disabled');
            // Remove preference cookies
            this.deleteCookie('socevents_theme');
            this.deleteCookie('socevents_language');
        }
    }

    // Cookie utility functions
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        // Also try with domain
        const domain = window.location.hostname;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${domain};`;
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.${domain};`;
    }

    // Public methods for other scripts
    hasConsent(category) {
        return this.consentData.categories[category] === true;
    }

    getConsentData() {
        return this.consentData;
    }

    resetConsent() {
        localStorage.removeItem('socevents_cookie_consent');
        this.deleteCookie('socevents_consent');
        location.reload();
    }
}

// Initialize cookie manager when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.cookieManager = new CookieManager();
});

// Export for use in other scripts
window.CookieManager = CookieManager;
