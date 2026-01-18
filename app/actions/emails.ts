'use server';

import { createClient } from '@supabase/supabase-js';

export async function getMemberEmails(profileIds: string[]) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('Missing env vars:', { 
        hasUrl: !!supabaseUrl, 
        hasKey: !!serviceKey 
      });
      return { 
        success: false, 
        error: 'Server configuration error',
        emails: [] 
      };
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      console.error('Supabase error:', error);
      return { 
        success: false, 
        error: error.message,
        emails: [] 
      };
    }

    const users = data.users || [];
    const emails = users
      .filter(user => profileIds.includes(user.id) && user.email)
      .map(user => user.email!);

    console.log('Found emails:', emails.length);

    return { 
      success: true, 
      emails,
      debug: {
        totalUsers: users.length,
        profileIdsReceived: profileIds.length,
        emailsFound: emails.length
      }
    };

  } catch (error) {
    console.error('Exception:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      emails: [] 
    };
  }
}