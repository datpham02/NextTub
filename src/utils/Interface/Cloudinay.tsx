export interface VideoFileUpLoadResponse {
    asset_id: string
    public_id: string
    version: number
    version_id: string
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: any[]
    pages: number
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    playback_url: string
    folder: string
    access_mode: string
    audio: Audio
    video: Video
    is_audio: boolean
    frame_rate: number
    bit_rate: number
    duration: number
    rotation: number
    original_filename: string
    nb_frames: number
}

export interface Audio {
    codec: string
    bit_rate: string
    frequency: number
    channels: number
    channel_layout: string
}

export interface Video {
    pix_format: string
    codec: string
    level: number
    profile: string
    bit_rate: string
    dar: string
    time_base: string
}

export interface ImgFileUpLoadResponse {
    asset_id: string
    public_id: string
    version: number
    version_id: string
    signature: string
    width: number
    height: number
    format: string
    resource_type: string
    created_at: string
    tags: any[]
    bytes: number
    type: string
    etag: string
    placeholder: boolean
    url: string
    secure_url: string
    folder: string
    access_mode: string
    original_filename: string
}
