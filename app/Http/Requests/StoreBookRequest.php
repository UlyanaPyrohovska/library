<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'year' => 'required|',
            'category' => 'exists:categories,id',
            'authors' => 'required',
            'keywords' => 'required',
            'link' => 'required|string',
            'pub_house' => 'exists:pub_houses,id',

            // 'user_id' => 'exists:users,id',
        ];
    }
}