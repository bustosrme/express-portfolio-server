import { envs } from '../../config';
import { formattedDateNow } from '../../utils';

export class WebhooksService {

    constructor() { }

    
    async notify(message: string) {
        const discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

        if (!discordWebhookUrl || discordWebhookUrl === '') {
            console.log('Discord webhook url not set');
            return false;
        }

        const body = {
            content: message,
        }

        const response = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log('Error sending message to discord');
            return false;
        }
        return true;
    }

    async notifyWithIP(message: string, ip: any = 'unknown') {
        this.notify(message + ' - IP: ' + ip + ' - Date: ' + formattedDateNow());
    }
}