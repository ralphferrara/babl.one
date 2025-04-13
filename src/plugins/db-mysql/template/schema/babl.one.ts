/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| babl.one ::  /schema/babl.one.ts
//|| 
//|| Using Kysely to generate types for the database schema
//|| npm install kysely-codegen --save-dev
//|| npx kysely-codegen --url "mysql://root:bablone!@localhost:3306/sonata_next" --out-file ./schema/sonata_next.ts
//|| 
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

import type { ColumnType } from "kysely";

export type Decimal = ColumnType<string, number | string>;

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
      ? ColumnType<S, I | undefined, U>
      : ColumnType<T, T | undefined, T>;

export interface Areas {
      area_code: string;
      area_description: Generated<string | null>;
      id_area: Generated<number>;
}

export interface Blogs {
      blog_area: Generated<string | null>;
      blog_permissions: Generated<string | null>;
      blog_text: Generated<string | null>;
      blog_timestamp: Generated<Date | null>;
      blog_title: Generated<string | null>;
      fid_area: Generated<number | null>;
      fid_media_cover: Generated<string | null>;
      fid_media_profile: Generated<number | null>;
      fid_user: Generated<number | null>;
      id_blog: Generated<number>;
}

export interface Categories {
      category_area: Generated<string | null>;
      category_json: Generated<string | null>;
      category_name: Generated<string | null>;
      category_order: Generated<number | null>;
      category_slug: Generated<string | null>;
      fid_category: Generated<number | null>;
      id_category: Generated<number>;
}

export interface Comments {
      comment_area: string;
      comment_comment: string;
      comment_datetime: Generated<Date>;
      comment_read: Generated<number>;
      fid_area: Generated<number | null>;
      fid_comment: Generated<number | null>;
      fid_recipient: Generated<number | null>;
      fid_user: Generated<number | null>;
      id_comment: Generated<number>;
}

export interface Connections {
      connection_area: Generated<string | null>;
      connection_completed: Generated<Date | null>;
      connection_json: Generated<string | null>;
      connection_status: Generated<string | null>;
      connection_timestamp: Generated<Date | null>;
      connection_type: Generated<string | null>;
      fid_area: Generated<number | null>;
      fid_recipient: Generated<number | null>;
      fid_user: Generated<number | null>;
      id_connection: Generated<number>;
}

export interface Entities {
      entity_count_media: Generated<number | null>;
      entity_count_score: Generated<number | null>;
      entity_count_users: Generated<number | null>;
      entity_count_views: Generated<string | null>;
      entity_created: Generated<Date | null>;
      entity_description: Generated<string | null>;
      entity_name: Generated<string | null>;
      entity_score: Generated<Decimal | null>;
      entity_status: Generated<string | null>;
      entity_type: Generated<string | null>;
      entity_updated: Generated<Date | null>;
      fid_contact: Generated<number | null>;
      fid_media_cover: Generated<number | null>;
      fid_media_profile: Generated<number | null>;
      fid_time: Generated<number | null>;
      fid_user: Generated<number | null>;
      fid_user_approved: Generated<number | null>;
      id_entity: Generated<number>;
}

export interface EntitiesText {
      entitiestext_type: Generated<string | null>;
      entitiestext_value: Generated<string | null>;
      fid_entity: Generated<number | null>;
      id_entitytext: Generated<number>;
}

export interface Folders {
      fid_media_cover: Generated<number | null>;
      fid_user: Generated<number | null>;
      folder_created: Generated<Date | null>;
      folder_description: Generated<string | null>;
      folder_permissions: Generated<string | null>;
      folder_status: Generated<string | null>;
      folder_title: Generated<string | null>;
      folder_type: Generated<string | null>;
      folder_updated: Generated<Date | null>;
      id_folder: Generated<number>;
}

export interface Logins {
      fid_user: Generated<number | null>;
      id_login: Generated<number>;
      login_email: Generated<string | null>;
      login_password: Generated<string | null>;
      login_phone: Generated<string | null>;
      login_social: Generated<string | null>;
      login_status: Generated<string | null>;
      login_verified_email: Generated<number | null>;
      login_verified_phone: Generated<number | null>;
}

export interface Media {
      fid_area: Generated<number | null>;
      fid_folder: Generated<number | null>;
      fid_user: Generated<number | null>;
      fid_user_approved: Generated<number | null>;
      id_media: Generated<number>;
      media_approved: Generated<Date | null>;
      media_area: Generated<string | null>;
      media_classification: Generated<string | null>;
      media_count_downloads: Generated<number | null>;
      media_count_views: Generated<number | null>;
      media_description: Generated<string | null>;
      media_dimension_x: Generated<number | null>;
      media_dimension_y: Generated<number | null>;
      media_duration: Generated<number | null>;
      media_error: Generated<string | null>;
      media_meta: Generated<string | null>;
      media_orientation: Generated<string | null>;
      media_status: Generated<string | null>;
      media_tags: Generated<string | null>;
      media_timestamp: Generated<Date | null>;
      media_type: Generated<string | null>;
}

export interface Partners {
      fid_user: Generated<number | null>;
      fid_verification: Generated<number | null>;
      id_partner: Generated<number>;
      partner_city: Generated<string | null>;
      partner_dob: Generated<Date | null>;
      partner_gender: Generated<string | null>;
      partner_latitude: Generated<Decimal | null>;
      partner_longitude: Generated<Decimal | null>;
      partner_postal: Generated<string | null>;
      partner_state: Generated<string | null>;
      partner_verified: Generated<Date | null>;
}

export interface Reactions {
      fid_area: Generated<number | null>;
      fid_recipient: Generated<number | null>;
      fid_user: number;
      id_like: Generated<number>;
      reaction_altered: Generated<Date | null>;
      reaction_area: string;
      reaction_reaction: Generated<string | null>;
      reaction_read: Generated<number>;
      reaction_timestamp: Generated<Date>;
}

export interface Settings {
      fid_user: Generated<number | null>;
      id_setting: Generated<number>;
      setting_area: Generated<string | null>;
      setting_enabled: Generated<number | null>;
      setting_name: Generated<string | null>;
}

export interface Slugs {
      fid_area: Generated<number | null>;
      id_slug: Generated<number>;
      slug_area: Generated<string | null>;
      slug_previous: Generated<string | null>;
      slug_slug: Generated<string | null>;
}

export interface Statuses {
      id_status: Generated<number>;
      status_area: Generated<string | null>;
      status_code: Generated<string | null>;
      status_description: Generated<string | null>;
      status_iserror: Generated<number | null>;
}

export interface Times {
      id_time: number;
      time_end: Generated<Date | null>;
      time_start: Generated<Date | null>;
      time_zone: Generated<number | null>;
}

export interface Users {
      fid_media_cover: Generated<number | null>;
      fid_media_profile: Generated<number | null>;
      fid_verification: Generated<number | null>;
      id_user: Generated<number>;
      user_age_max: Generated<number | null>;
      user_age_min: Generated<number | null>;
      user_cancelled: Generated<Date | null>;
      user_city: Generated<string | null>;
      user_count_forum: Generated<number | null>;
      user_count_images: Generated<number | null>;
      user_count_videos: Generated<number | null>;
      user_count_views: Generated<number | null>;
      user_country: Generated<string | null>;
      user_dob: Generated<Date | null>;
      user_expires: Generated<Date | null>;
      user_gender: Generated<string | null>;
      user_joined: Generated<Date | null>;
      user_latitude: Generated<Decimal | null>;
      user_level: Generated<number | null>;
      user_login: Generated<Date | null>;
      user_longitude: Generated<Decimal | null>;
      user_popularity: Generated<number | null>;
      user_postal: Generated<string | null>;
      user_score: Generated<number | null>;
      user_state: Generated<string | null>;
      user_status: Generated<string | null>;
      user_username: string;
      user_verified: Generated<Date | null>;
}

export interface Verifications {
      fid_area: Generated<number | null>;
      fid_reviewer: Generated<number | null>;
      fid_type: Generated<number | null>;
      id_verification: number;
      verification_files: Generated<string | null>;
      verification_method: Generated<string | null>;
      verification_notes_private: Generated<string | null>;
      verification_notes_public: Generated<string | null>;
      verification_reviewed: Generated<Date | null>;
      verification_submitted: Generated<Date | null>;
      veriification_status: Generated<string | null>;
}

export interface Database {
      areas: Areas;
      blogs: Blogs;
      categories: Categories;
      comments: Comments;
      connections: Connections;
      entities: Entities;
      entities_text: EntitiesText;
      folders: Folders;
      logins: Logins;
      media: Media;
      partners: Partners;
      reactions: Reactions;
      settings: Settings;
      slugs: Slugs;
      statuses: Statuses;
      times: Times;
      users: Users;
      verifications: Verifications;
}
