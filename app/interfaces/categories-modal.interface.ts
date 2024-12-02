interface modalProps {
  postImage?: string[];
  title: string;
  description: string;
  onclose: () => void;
  postDelta: string;
  titleDelta: string;
  postText: string;
  titleText: string;
  /**The following types are optional and are only applied if a post is to be updated as opposed to creating a new post */
  update?: boolean;
  existingCategories?: string[];
  id?: string;
}
interface category {
  _id?: string;
  description?: string;
  name?: string;
  usage_count?: number;
}
interface options {
  value: string | undefined;
  label: string | undefined;
}

interface Uploadpayload {
  title: string;
  post: string;
  categories: string[];
  title_preview: string;
  subtitle_preview: string;
  title_text: string;
  post_text: string;
  image_preview?: string;
}
